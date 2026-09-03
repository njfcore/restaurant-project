import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import prisma from './src/lib/prisma';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // --------------------------------------------------------------------------
  // API Routes (Prisma Database Operations)
  // --------------------------------------------------------------------------

  // Health Check & DB connection status
  app.get('/api/health', async (req, res) => {
    try {
      const categoryCount = await prisma.category.count();
      const itemCount = await prisma.menuItem.count();
      res.json({
        status: 'ok',
        database: 'connected',
        categoryCount,
        itemCount,
        timestamp: new Date().toISOString(),
      });
    } catch (err: any) {
      res.status(500).json({ status: 'error', error: err.message });
    }
  });

  // 1. AUTH & USER ENDPOINTS
  // Register user
  app.post('/api/auth/register', async (req, res) => {
    try {
      const { name, phone, email, password } = req.body;
      if (!name || !phone) {
        return res.status(400).json({ error: 'نام و شماره تماس الزامی است.' });
      }

      // Check existing
      let user = await prisma.user.findFirst({
        where: {
          OR: [{ phone }, ...(email ? [{ email }] : [])],
        },
      });

      if (user) {
        return res.status(400).json({ error: 'کاربری با این شماره یا ایمیل قبلاً ثبت نام نموده است.' });
      }

      user = await prisma.user.create({
        data: {
          name,
          phone,
          email: email || null,
          passwordHash: password || null,
          vipTier: 'عضو نقره‌ای نورا و نوبل',
          role: 'CUSTOMER',
        },
      });

      res.status(201).json({
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email || '',
        vipTier: user.vipTier,
        isLoggedIn: true,
        joinedDate: new Date(user.createdAt).toLocaleDateString('fa-IR'),
      });
    } catch (err: any) {
      console.error('Error in /api/auth/register:', err);
      res.status(500).json({ error: 'خطا در ثبت نام کاربر.', details: err.message });
    }
  });

  // Login user
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { identifier, password } = req.body;
      if (!identifier) {
        return res.status(400).json({ error: 'شماره تماس یا ایمیل الزامی است.' });
      }

      let user = await prisma.user.findFirst({
        where: {
          OR: [{ phone: identifier }, { email: identifier }],
        },
      });

      // If user doesn't exist, create VIP/Customer automatically
      if (!user) {
        user = await prisma.user.create({
          data: {
            name: identifier.includes('@') ? identifier.split('@')[0] : 'کاربر گرامی نورا و نوبل',
            phone: identifier.includes('@') ? '۰۹۱۲' + Math.floor(1000000 + Math.random() * 9000000) : identifier,
            email: identifier.includes('@') ? identifier : `${identifier}@nournoble.luxury`,
            passwordHash: password || null,
            vipTier: 'عضو طلایی VIP',
            role: 'VIP',
          },
        });
      }

      res.json({
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email || '',
        vipTier: user.vipTier,
        isLoggedIn: true,
        joinedDate: new Date(user.createdAt).toLocaleDateString('fa-IR'),
      });
    } catch (err: any) {
      console.error('Error in /api/auth/login:', err);
      res.status(500).json({ error: 'خطا در ورود به حساب.', details: err.message });
    }
  });

  // Get user profile with reservations & orders
  app.get('/api/auth/profile/:phoneOrId', async (req, res) => {
    try {
      const { phoneOrId } = req.params;
      const user = await prisma.user.findFirst({
        where: {
          OR: [{ id: phoneOrId }, { phone: phoneOrId }, { email: phoneOrId }],
        },
        include: {
          reservations: { orderBy: { createdAt: 'desc' }, take: 5 },
          orders: {
            orderBy: { createdAt: 'desc' },
            take: 5,
            include: { items: { include: { menuItem: true } } },
          },
        },
      });

      if (!user) {
        return res.status(404).json({ error: 'کاربر یافت نشد.' });
      }

      res.json(user);
    } catch (err: any) {
      res.status(500).json({ error: 'خطا در دریافت مشخصات کاربر.', details: err.message });
    }
  });

  // 2. MENU & CATEGORY ENDPOINTS
  // Get all categories
  app.get('/api/categories', async (req, res) => {
    try {
      const categories = await prisma.category.findMany({
        orderBy: { sortOrder: 'asc' },
        include: { _count: { select: { items: true } } },
      });
      res.json(categories);
    } catch (err: any) {
      res.status(500).json({ error: 'خطا در دریافت دسته‌بندی‌ها.', details: err.message });
    }
  });

  // Get all menu items
  app.get('/api/menu', async (req, res) => {
    try {
      const { category } = req.query;
      const whereClause = category && category !== 'all' ? { categoryId: String(category) } : {};

      const items = await prisma.menuItem.findMany({
        where: whereClause,
        include: { category: true },
        orderBy: { isSpecial: 'desc' },
      });

      const formatted = items.map((item) => ({
        id: item.id,
        name: item.name,
        persianName: item.persianName,
        category: item.categoryId,
        price: item.price,
        priceFormatted: item.priceFormatted,
        description: item.description,
        image: item.image,
        tags: item.tags ? JSON.parse(item.tags) : [],
        isSpecial: item.isSpecial,
        calories: item.calories || undefined,
        prepTime: item.prepTime || undefined,
        rating: item.rating,
        ingredients: item.ingredients ? JSON.parse(item.ingredients) : [],
      }));

      res.json(formatted);
    } catch (err: any) {
      console.error('Error fetching menu items:', err);
      res.status(500).json({ error: 'خطا در دریافت منو از دیتابیس.', details: err.message });
    }
  });

  // Get single menu item by ID
  app.get('/api/menu/:id', async (req, res) => {
    try {
      const item = await prisma.menuItem.findUnique({
        where: { id: req.params.id },
        include: { category: true },
      });
      if (!item) return res.status(404).json({ error: 'غذا یافت نشد.' });

      res.json({
        id: item.id,
        name: item.name,
        persianName: item.persianName,
        category: item.categoryId,
        price: item.price,
        priceFormatted: item.priceFormatted,
        description: item.description,
        image: item.image,
        tags: item.tags ? JSON.parse(item.tags) : [],
        isSpecial: item.isSpecial,
        calories: item.calories,
        prepTime: item.prepTime,
        rating: item.rating,
        ingredients: item.ingredients ? JSON.parse(item.ingredients) : [],
      });
    } catch (err: any) {
      res.status(500).json({ error: 'خطا در دریافت اطلاعات غذا.', details: err.message });
    }
  });

  // 3. RESERVATIONS ENDPOINTS
  // Create reservation
  app.post('/api/reservations', async (req, res) => {
    try {
      const { name, phone, email, guests, date, time, seatingArea, occasion, specialRequests, userId } = req.body;
      if (!name || !phone) {
        return res.status(400).json({ error: 'نام و شماره تماس جهت رزرو الزامی است.' });
      }

      const reservationId = `NOBLE-${Math.floor(100000 + Math.random() * 900000)}`;

      const reservation = await prisma.reservation.create({
        data: {
          id: reservationId,
          userId: userId || null,
          name,
          phone,
          email: email || null,
          guests: Number(guests) || 2,
          date: date || 'امروز',
          time: time || '۲۰:۰۰',
          seatingArea: seatingArea || 'main',
          occasion: occasion || null,
          specialRequests: specialRequests || null,
          status: 'CONFIRMED',
        },
      });

      res.status(201).json(reservation);
    } catch (err: any) {
      console.error('Error creating reservation:', err);
      res.status(500).json({ error: 'خطا در ثبت رزرو در دیتابیس.', details: err.message });
    }
  });

  // Get reservations (all or by phone)
  app.get('/api/reservations', async (req, res) => {
    try {
      const { phone, userId } = req.query;
      const whereClause: any = {};
      if (phone) whereClause.phone = String(phone);
      if (userId) whereClause.userId = String(userId);

      const reservations = await prisma.reservation.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
      });
      res.json(reservations);
    } catch (err: any) {
      res.status(500).json({ error: 'خطا در دریافت رزروها.', details: err.message });
    }
  });

  // 4. ORDERS ENDPOINTS
  // Create online order
  app.post('/api/orders', async (req, res) => {
    try {
      const { customerName, phone, orderType, subtotal, discount, tax, total, couponCode, notes, items, userId } =
        req.body;

      if (!customerName || !phone || !items || !items.length) {
        return res.status(400).json({ error: 'اطلاعات سفارش و اقلام سبد خرید الزامی است.' });
      }

      const orderCode = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

      const order = await prisma.order.create({
        data: {
          orderCode,
          userId: userId || null,
          customerName,
          phone,
          orderType: orderType || 'dine_in',
          status: 'RECEIVED',
          subtotal: Number(subtotal) || 0,
          discount: Number(discount) || 0,
          tax: Number(tax) || 0,
          total: Number(total) || 0,
          couponCode: couponCode || null,
          notes: notes || null,
          items: {
            create: items.map((item: any) => ({
              menuItemId: item.menuItemId || item.item?.id,
              quantity: item.quantity || 1,
              unitPrice: item.unitPrice || item.item?.price || 0,
              notes: item.notes || null,
            })),
          },
        },
        include: {
          items: { include: { menuItem: true } },
        },
      });

      res.status(201).json(order);
    } catch (err: any) {
      console.error('Error creating order in Prisma:', err);
      res.status(500).json({ error: 'خطا در ثبت سفارش در دیتابیس.', details: err.message });
    }
  });

  // Get orders by phone or user
  app.get('/api/orders', async (req, res) => {
    try {
      const { phone, userId } = req.query;
      const whereClause: any = {};
      if (phone) whereClause.phone = String(phone);
      if (userId) whereClause.userId = String(userId);

      const orders = await prisma.order.findMany({
        where: whereClause,
        include: { items: { include: { menuItem: true } } },
        orderBy: { createdAt: 'desc' },
      });
      res.json(orders);
    } catch (err: any) {
      res.status(500).json({ error: 'خطا در دریافت لیست سفارشات.', details: err.message });
    }
  });

  // 5. CONTACT & INQUIRIES
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, phone, email, message } = req.body;
      if (!name || !phone || !message) {
        return res.status(400).json({ error: 'نام، شماره تماس و متن پیام الزامی است.' });
      }

      const contact = await prisma.contactMessage.create({
        data: {
          name,
          phone,
          email: email || null,
          message,
          status: 'NEW',
        },
      });

      res.status(201).json(contact);
    } catch (err: any) {
      console.error('Error saving contact message:', err);
      res.status(500).json({ error: 'خطا در ثبت پیام.', details: err.message });
    }
  });

  // 6. REVIEWS
  app.get('/api/reviews', async (req, res) => {
    try {
      const reviews = await prisma.review.findMany({
        where: { approved: true },
        orderBy: { createdAt: 'desc' },
      });
      res.json(reviews);
    } catch (err: any) {
      res.status(500).json({ error: 'خطا در دریافت نظرات.', details: err.message });
    }
  });

  app.post('/api/reviews', async (req, res) => {
    try {
      const { author, rating, comment, userId } = req.body;
      if (!author || !comment) {
        return res.status(400).json({ error: 'نام و متن نظر الزامی است.' });
      }

      const review = await prisma.review.create({
        data: {
          author,
          rating: Number(rating) || 5,
          comment,
          date: new Date().toLocaleDateString('fa-IR'),
          userId: userId || null,
          approved: true,
        },
      });

      res.status(201).json(review);
    } catch (err: any) {
      res.status(500).json({ error: 'خطا در ثبت نظر.', details: err.message });
    }
  });

  // --------------------------------------------------------------------------
  // Vite Middleware & Static Serving Setup
  // --------------------------------------------------------------------------
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Nour & Noble Server with Prisma running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error in server:', err);
  process.exit(1);
});
