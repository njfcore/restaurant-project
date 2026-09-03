import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Prisma database seeding for Nour & Noble Restaurant...');

  // 1. Seed Categories
  const categories = [
    { id: 'starters', name: 'Antipasti / Starters', persianName: 'پیش‌غذا', sortOrder: 1 },
    { id: 'mains', name: 'Main Courses', persianName: 'غذاهای اصلی', sortOrder: 2 },
    { id: 'pasta_pizza', name: 'Pasta & Pizza', persianName: 'پاستا و پیتزا', sortOrder: 3 },
    { id: 'desserts', name: 'Desserts', persianName: 'دسرها', sortOrder: 4 },
    { id: 'drinks', name: 'Beverages', persianName: 'نوشیدنی‌ها', sortOrder: 5 },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { id: cat.id },
      update: cat,
      create: cat,
    });
  }
  console.log(`✅ Seeded ${categories.length} categories.`);

  // 2. Seed Menu Items
  const menuItems = [
    // پاستا و پیتزا
    {
      id: 'pizza-margherita',
      name: 'Pizza Margherita',
      persianName: 'پیتزا مارگاریتا',
      categoryId: 'pasta_pizza',
      price: 250000,
      priceFormatted: '۲۵۰,۰۰۰ تومان',
      description: 'خمیر دست‌ساز ناپلی، سس گوجه‌فرنگی سان مارزانو، پنیر موزارلا تازه، ریحان ایتالیایی و روغن زیتون فرابکر.',
      image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=600&q=80',
      tags: JSON.stringify(['گیاهی', 'دست‌ساز', 'پرفروش']),
      isSpecial: true,
      calories: 780,
      prepTime: '۱۵-۲۰ دقیقه',
      rating: 4.9,
      ingredients: JSON.stringify(['خمیر ناپلی ۴۸ ساعته', 'گوجه سان مارزانو DOP', 'موزارلا دی بوفالا', 'ریحان ارگانیک', 'روغن زیتون فرابکر']),
    },
    {
      id: 'spaghetti-carbonara',
      name: 'Spaghetti Carbonara',
      persianName: 'اسپاگتی کربنارا',
      categoryId: 'pasta_pizza',
      price: 320000,
      priceFormatted: '۳۲۰,۰۰۰ تومان',
      description: 'اسپاگتی اصیل ایتالیایی با سس زرده تخم‌مرغ، پنیر پکورینو رومانو، گوانچاله ترد و فلفل سیاه تازه ساییده شده.',
      image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=600&q=80',
      tags: JSON.stringify(['اصیل رمی', 'دستور سنتی']),
      isSpecial: true,
      calories: 840,
      prepTime: '۱۵ دقیقه',
      rating: 4.95,
      ingredients: JSON.stringify(['پاستا برنزی دست‌ساز', 'زرده تخم‌مرغ محلی', 'پنیر پکورینو رومانو ۱۸ ماهه', 'گوانچاله دودی', 'فلفل سیاه تلچری']),
    },
    {
      id: 'fettuccine-alfredo',
      name: 'Fettuccine Alfredo con Funghi',
      persianName: 'فتوچینی آلفردو با قارچ ترافل',
      categoryId: 'pasta_pizza',
      price: 340000,
      priceFormatted: '۳۴۰,۰۰۰ تومان',
      description: 'پاستا فتوچینی تازه همراه با سس خامه و کره پارمزان، قارچ پورچینی برشته و روغن ترافل سیاه ایتالیایی.',
      image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80',
      tags: JSON.stringify(['پیشنهاد سرآشپز']),
      isSpecial: false,
      calories: 790,
      prepTime: '۱۵ دقیقه',
      rating: 4.8,
      ingredients: JSON.stringify(['پاستا فتوچینی تازه', 'خامه ارگانیک', 'پنیر پارمیجانو ۳۰ ماهه', 'قارچ وحشی پورچینی', 'روغن ترافل']),
    },
    {
      id: 'pizza-diavola',
      name: 'Pizza Diavola',
      persianName: 'پیتزا دیاوولا تند',
      categoryId: 'pasta_pizza',
      price: 290000,
      priceFormatted: '۲۹۰,۰۰۰ تومان',
      description: 'سس گوجه سنتی، پنیر فیر دی لاته، سالامی تند کالابریا، فلفل چیلی رست شده و قطرات عسل تند هالوپینو.',
      image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80',
      tags: JSON.stringify(['تند', 'پرفروش']),
      isSpecial: false,
      calories: 860,
      prepTime: '۱۸ دقیقه',
      rating: 4.85,
      ingredients: JSON.stringify(['سالامی اسپیناتا', 'پنیر موزارلا', 'فلفل هالوپینو دودی', 'روغن چیلی']),
    },
    {
      id: 'pizza-quattro-formaggi',
      name: 'Pizza Quattro Formaggi',
      persianName: 'پیتزا کواترو فورماجی (چهار پنیر)',
      categoryId: 'pasta_pizza',
      price: 310000,
      priceFormatted: '۳۱۰,۰۰۰ تومان',
      description: 'ترکیب اعلای پنیرهای موزارلا، گورگونزولا دولچه، فونتینا و پارمیجانو رجیانو با گردوی برشته و عسل اکالیپتوس.',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
      tags: JSON.stringify(['گیاهی', 'لوکس']),
      isSpecial: false,
      calories: 910,
      prepTime: '۱۵ دقیقه',
      rating: 4.75,
      ingredients: JSON.stringify(['پنیر موزارلا', 'پنیر بلوچیز گورگونزولا', 'پنیر فونتینا آلپاین', 'پارمزان کهنه', 'گردو کاراملی']),
    },

    // غذاهای اصلی
    {
      id: 'kebab-koobideh',
      name: 'Authentic Koobideh Kebab',
      persianName: 'کباب کوبیده اصیل',
      categoryId: 'mains',
      price: 450000,
      priceFormatted: '۴۵۰,۰۰۰ تومان',
      description: 'دو سیخ کباب کوبیده مخصوص با گوشت تازه گوسفندی و گوساله، همراه با برنج زعفرانی هاشمی، گوجه کبابی و کره محلی.',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
      tags: JSON.stringify(['غذای اصیل', 'ویژه نورا و نوبل', 'زعفرانی']),
      isSpecial: true,
      calories: 950,
      prepTime: '۲۰-۲۵ دقیقه',
      rating: 5.0,
      ingredients: JSON.stringify(['راسته و قلوه‌گاه گوسفندی تازه', 'برنج دمسیاه هاشمی درجه یک', 'زعفران ممتاز قائنات', 'سماق کوهی تبریز', 'کره حیوانی اعلا']),
    },
    {
      id: 'filet-mignon',
      name: 'Filet Mignon al Pepe Verde',
      persianName: 'استیک فیله مینیون با سس فلفل سبز',
      categoryId: 'mains',
      price: 680000,
      priceFormatted: '۶۸۰,۰۰۰ تومان',
      description: '۲۸۰ گرم مغز فیله گوساله آنگوس گریل شده، با سس فلفل سبز ماداگاسکار و پوره سیب‌زمینی ترافلی دست‌ساز.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
      tags: JSON.stringify(['لوکس', 'پروتئین بالا']),
      isSpecial: true,
      calories: 720,
      prepTime: '۲۰ دقیقه',
      rating: 4.9,
      ingredients: JSON.stringify(['فیله گوساله بلک آنگوس', 'سس فلفل سبز تازه', 'خامه غلیظ سرشیر', 'پوره ترافل']),
    },
    {
      id: 'shishlik-kebab',
      name: 'VIP Shishlik Rib Kebab',
      persianName: 'شیشلیک شاندیز ممتاز',
      categoryId: 'mains',
      price: 720000,
      priceFormatted: '۷۲۰,۰۰۰ تومان',
      description: 'شش قطعه راسته با دنده گوسفندی طعم‌دار شده با آب پیاز، زعفران اعلا و فلفل سیاه، گریل شده روی زغال چوب طبیعی.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
      tags: JSON.stringify(['کباب سنتی', 'گوشت تازه']),
      isSpecial: false,
      calories: 1050,
      prepTime: '۲۵ دقیقه',
      rating: 4.95,
      ingredients: JSON.stringify(['دنده گوسفندی شاندیزی', 'پیاز سفید خرد شده', 'زعفران سرگل', 'کره محلی']),
    },
    {
      id: 'salmon-mediterranean',
      name: 'Salmone alla Griglia',
      persianName: 'فیله سالمون گریل مدیترانه‌ای',
      categoryId: 'mains',
      price: 540000,
      priceFormatted: '۵۴۰,۰۰۰ تومان',
      description: 'فیله سالمون تازه نروژی با روکش سبزیجات معطر، سس لیمو و کاپاریس، همراه با مارچوبه و کدو گریل شده.',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80',
      tags: JSON.stringify(['دریایی', 'سالم', 'امگا۳']),
      isSpecial: false,
      calories: 580,
      prepTime: '۱۸ دقیقه',
      rating: 4.85,
      ingredients: JSON.stringify(['سالمون نروژی سوپریم', 'کاپاریس سیسیلی', 'روغن زیتون لیمو', 'مارچوبه تازه']),
    },

    // دسرها
    {
      id: 'chocolate-cake',
      name: 'Dark Chocolate Mousse Cake',
      persianName: 'کیک شکلات تلخ بلژیکی',
      categoryId: 'desserts',
      price: 180000,
      priceFormatted: '۱۸۰,۰۰۰ تومان',
      description: 'موس شکلات تلخ بلژیکی ۷۰٪ با روکش گلیز براق، همراه با ورق طلای خوراکی و سس تمشک تازه.',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
      tags: JSON.stringify(['شکلاتی', 'دست‌ساز', 'لوکس']),
      isSpecial: true,
      calories: 420,
      prepTime: '۵-۱۰ دقیقه',
      rating: 4.95,
      ingredients: JSON.stringify(['شکلات کالیبائو ۷۰٪ بلژیک', 'ورق طلای ۲۴ عیار خوراکی', 'پوره تمشک جنگلی', 'خامه تازه']),
    },
    {
      id: 'tiramisu-classico',
      name: 'Tiramisù Classico Veneziano',
      persianName: 'تیرامیسو کلاسیک ونیزی',
      categoryId: 'desserts',
      price: 160000,
      priceFormatted: '۱۶۰,۰۰۰ تومان',
      description: 'بیسکویت لیدی‌فینگر آغشته به اسپرسوی تازه دم، کرم ماسکارپونه مخملی و پودر کاکائوی دارک والروهنا.',
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
      tags: JSON.stringify(['دسرهای محبوب', 'اصیل ایتالیایی']),
      isSpecial: false,
      calories: 390,
      prepTime: '۵ دقیقه',
      rating: 4.9,
      ingredients: JSON.stringify(['پنیر ماسکارپونه لومباردی', 'اسپرسو دوبل تخصصی', 'لیدی فینگر ساوویاردی', 'کاکائو والروهنا']),
    },
    {
      id: 'baklava-pistachio',
      name: 'Pistachio Baklava with Saffron Ice Cream',
      persianName: 'باقلوا پسته با بستنی سنتی زعفرانی',
      categoryId: 'desserts',
      price: 195000,
      priceFormatted: '۱۹۵,۰۰۰ تومان',
      description: 'لایه‌های نازک خمیر یوفکا کره‌ای پر شده با مغز پسته تازه رفسنجان و شربت گلاب، همراه با بستنی سنتی خامه دار.',
      image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80',
      tags: JSON.stringify(['سنتی ممتاز', 'پسته اعلا']),
      isSpecial: false,
      calories: 480,
      prepTime: '۵ دقیقه',
      rating: 4.88,
      ingredients: JSON.stringify(['پسته سبز اعلای کرمان', 'شربت هل و گلاب ناب کاشان', 'خمیر فیلو کره‌ای', 'بستنی سنتی سرشیردار']),
    },

    // پیش‌غذا
    {
      id: 'bruschetta-pomodoro',
      name: 'Bruschetta al Pomodoro e Burrata',
      persianName: 'بروسکتا گوجه و بوراتا',
      categoryId: 'starters',
      price: 150000,
      priceFormatted: '۱۵۰,۰۰۰ تومان',
      description: 'نان چاباتا برشته شده با سیر، گوجه گیلاسی مرینیت شده با بالزامیک کهنه مودنا، پنیر بوراتای خرد شده و ریحان تازه.',
      image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=600&q=80',
      tags: JSON.stringify(['گیاهی', 'سبک']),
      isSpecial: true,
      calories: 320,
      prepTime: '۱۰ دقیقه',
      rating: 4.8,
      ingredients: JSON.stringify(['نان چاباتا آرتیسان', 'گوجه گیلاسی ارگانیک', 'سرکه بالزامیک ۱۲ ساله مودنا', 'بوراتا تازه']),
    },
    {
      id: 'mirza-ghasemi',
      name: 'Mirza Ghasemi Tradizionale',
      persianName: 'میرزاقاسمی دودی گیلان',
      categoryId: 'starters',
      price: 140000,
      priceFormatted: '۱۴۰,۰۰۰ تومان',
      description: 'بادمجان کباب شده روی هیزم با عطر دود ناب، سیر تازه تفت داده شده، گوجه فرنگی رنده شده و تخم‌مرغ محلی همراه نان داغ.',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
      tags: JSON.stringify(['شمالی اصیل', 'دودی']),
      isSpecial: false,
      calories: 280,
      prepTime: '۱۰ دقیقه',
      rating: 4.9,
      ingredients: JSON.stringify(['بادمجان قلمی کبابی', 'سیر تازه لشت نشا', 'گوجه فرنگی رسی', 'تخم‌مرغ زرده طلایی']),
    },
    {
      id: 'carpaccio-manzo',
      name: 'Carpaccio di Manzo al Tartufo',
      persianName: 'کارپاچیو فیله گوساله با ترافل',
      categoryId: 'starters',
      price: 260000,
      priceFormatted: '۲۶۰,۰۰۰ تومان',
      description: 'برش‌های بسیار نازک فیله گوساله خام مرینیت شده با آب لیموی سیسیلی، پرک‌های پارمزان، کاپاریس و روغن ترافل سفید.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
      tags: JSON.stringify(['آشپزی کلاسیک', 'لوکس']),
      isSpecial: false,
      calories: 290,
      prepTime: '۸ دقیقه',
      rating: 4.75,
      ingredients: JSON.stringify(['فیله گوساله تازه', 'پارمزان ۳۰ ماهه', 'روغن ترافل سفید آلبا', 'راکت / شاهی ارگانیک']),
    },

    // نوشیدنی‌ها
    {
      id: 'drink-saffron-mojito',
      name: 'Royal Saffron Lime Mocktail',
      persianName: 'موکتیل سلطنتی زعفران و لیمو',
      categoryId: 'drinks',
      price: 110000,
      priceFormatted: '۱۱۰,۰۰۰ تومان',
      description: 'عصاره غلیظ زعفران قائنات، آب لیمو ترش تازه سنگی، نعناع تازه کوبیده شده، شهد نسترن و آب گازدار سودا.',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
      tags: JSON.stringify(['دست‌ساز', 'خنک‌کننده', 'بدون الکل']),
      isSpecial: true,
      calories: 120,
      prepTime: '۵ دقیقه',
      rating: 4.9,
      ingredients: JSON.stringify(['زعفران درجه یک قائنات', 'لیموترش تازه شیراز', 'نعناع مراکشی', 'شربت نسترن']),
    },
    {
      id: 'espresso-doppio',
      name: 'Espresso Doppio Artigianale',
      persianName: 'اسپرسو دوبل تخصصی ناپل',
      categoryId: 'drinks',
      price: 85000,
      priceFormatted: '۸۵,۰۰۰ تومان',
      description: 'عصاره‌گیری از بلند ۱۰۰٪ عربیکا خاستگاه آمریکای جنوبی و اتیوپی، بادی سنگین با نت‌های شکلات تلخ و کارامل.',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
      tags: JSON.stringify(['قهوه تخصصی', 'کافئین']),
      isSpecial: false,
      calories: 5,
      prepTime: '۳ دقیقه',
      rating: 4.95,
      ingredients: JSON.stringify(['دان ۱۰۰٪ عربیکا برشته‌کاری مدیوم دارک']),
    },
    {
      id: 'drink-pomegranate-berry',
      name: 'Wild Pomegranate & Berry Fizz',
      persianName: 'فیز انار ساوه و بری‌های جنگلی',
      categoryId: 'drinks',
      price: 125000,
      priceFormatted: '۱۲۵,۰۰۰ تومان',
      description: 'آب انار طبیعی یاقوتی ساوه با سیروپ دست‌ساز بلوبری، رزماری دودی و سودای گازدار به همراه یخ‌های میوه‌ای کریستالی.',
      image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80',
      tags: JSON.stringify(['طبیعی', 'پرفروش']),
      isSpecial: false,
      calories: 140,
      prepTime: '۵ دقیقه',
      rating: 4.85,
      ingredients: JSON.stringify(['آب انار خالص ترش و شیرین', 'بلوبری و تمشک', 'شاخه رزماری معطر']),
    },
  ];

  for (const item of menuItems) {
    await prisma.menuItem.upsert({
      where: { id: item.id },
      update: item,
      create: item,
    });
  }
  console.log(`✅ Seeded ${menuItems.length} menu items.`);

  // 3. Seed Demo Users
  const demoUser = await prisma.user.upsert({
    where: { phone: '۰۹۱۲۳۴۵۶۷۸۹' },
    update: {},
    create: {
      id: 'usr-vip-demo',
      name: 'علیرضا حسینی',
      phone: '۰۹۱۲۳۴۵۶۷۸۹',
      email: 'alireza@nournoble.luxury',
      vipTier: 'عضو طلایی VIP',
      role: 'VIP',
    },
  });
  console.log('✅ Seeded VIP Demo User:', demoUser.name);

  // 4. Seed Sample Reservation
  await prisma.reservation.upsert({
    where: { id: 'NOBLE-784912' },
    update: {},
    create: {
      id: 'NOBLE-784912',
      userId: demoUser.id,
      name: 'علیرضا حسینی',
      phone: '۰۹۱۲۳۴۵۶۷۸۹',
      email: 'alireza@nournoble.luxury',
      guests: 4,
      date: 'امروز - پنج‌شنبه',
      time: '۲۰:۳۰',
      seatingArea: 'vip',
      occasion: 'سالگرد ازدواج',
      specialRequests: 'میز اختصاصی با گل‌آرایی و شمع',
      status: 'CONFIRMED',
    },
  });
  console.log('✅ Seeded Sample Reservation.');

  // 5. Seed Sample Reviews
  const reviews = [
    {
      id: 'rev-1',
      author: 'دکتر مهدی ارجمند',
      rating: 5,
      comment: 'بهترین استیک فیله مینیون و اسپاگتی کاربونارایی که در خاورمیانه تجربه کردم. طراحی فضا و پذیرایی پرسنل در تراز بین‌المللی است.',
      date: '۱۴۰۳/۰۶/۰۲',
      approved: true,
    },
    {
      id: 'rev-2',
      author: 'مهندس نسترن راد',
      rating: 5,
      comment: 'پیتزا مارگاریتا و دسر تیرامیسو بی‌نظیر بود! طعم اصیل مواد اولیه ایتالیایی کاملاً حس می‌شد.',
      date: '۱۴۰۳/۰۶/۰۴',
      approved: true,
    },
    {
      id: 'rev-3',
      author: 'آرش کیانی',
      rating: 5,
      comment: 'تجربه شام در سالن VIP فوق‌العاده آرامش‌بخش و شیک بود. کباب کوبیده زعفرانی با کیفیت مثال‌زدنی سرو شد.',
      date: '۱۴۰۳/۰۶/۰۶',
      approved: true,
    },
  ];

  for (const rev of reviews) {
    await prisma.review.upsert({
      where: { id: rev.id },
      update: rev,
      create: rev,
    });
  }
  console.log('✅ Seeded Customer Reviews.');

  console.log('🎉 Prisma database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during Prisma seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
