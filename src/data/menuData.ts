import { MenuItem } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  // پاستا و پیتزا
  {
    id: 'pizza-margherita',
    name: 'Pizza Margherita',
    persianName: 'پیتزا مارگاریتا',
    category: 'pasta_pizza',
    price: 250000,
    priceFormatted: '۲۵۰,۰۰۰ تومان',
    description: 'خمیر دست‌ساز ناپلی، سس گوجه‌فرنگی سان مارزانو، پنیر موزارلا تازه، ریحان ایتالیایی و روغن زیتون فرابکر.',
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=600&q=80',
    tags: ['گیاهی', 'دست‌ساز', 'پرفروش'],
    isSpecial: true,
    calories: 780,
    prepTime: '۱۵-۲۰ دقیقه',
    rating: 4.9,
    ingredients: ['خمیر ناپلی ۴۸ ساعته', 'گوجه سان مارزانو DOP', 'موزارلا دی بوفالا', 'ریحان ارگانیک', 'روغن زیتون فرابکر']
  },
  {
    id: 'spaghetti-carbonara',
    name: 'Spaghetti Carbonara',
    persianName: 'اسپاگتی کربنارا',
    category: 'pasta_pizza',
    price: 320000,
    priceFormatted: '۳۲۰,۰۰۰ تومان',
    description: 'اسپاگتی اصیل ایتالیایی با سس زرده تخم‌مرغ، پنیر پکورینو رومانو، گوانچاله ترد و فلفل سیاه تازه ساییده شده.',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=600&q=80',
    tags: ['اصیل رمی', 'دستور سنتی'],
    isSpecial: true,
    calories: 840,
    prepTime: '۱۵ دقیقه',
    rating: 4.95,
    ingredients: ['پاستا برنزی دست‌ساز', 'زرده تخم‌مرغ محلی', 'پنیر پکورینو رومانو ۱۸ ماهه', 'گوانچاله دودی', 'فلفل سیاه تلچری']
  },
  {
    id: 'fettuccine-alfredo',
    name: 'Fettuccine Alfredo con Funghi',
    persianName: 'فتوچینی آلفردو با قارچ ترافل',
    category: 'pasta_pizza',
    price: 340000,
    priceFormatted: '۳۴۰,۰۰۰ تومان',
    description: 'پاستا فتوچینی تازه همراه با سس خامه و کره پارمزان، قارچ پورچینی برشته و روغن ترافل سیاه ایتالیایی.',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=600&q=80',
    tags: ['پیشنهاد سرآشپز'],
    isSpecial: false,
    calories: 790,
    prepTime: '۱۵ دقیقه',
    rating: 4.8,
    ingredients: ['پاستا فتوچینی تازه', 'خامه ارگانیک', 'پنیر پارمیجانو ۳۰ ماهه', 'قارچ وحشی پورچینی', 'روغن ترافل']
  },
  {
    id: 'pizza-diavola',
    name: 'Pizza Diavola',
    persianName: 'پیتزا دیاوولا تند',
    category: 'pasta_pizza',
    price: 290000,
    priceFormatted: '۲۹۰,۰۰۰ تومان',
    description: 'سس گوجه سنتی، پنیر فیر دی لاته، سالامی تند کالابریا، فلفل چیلی رست شده و قطرات عسل تند هالوپینو.',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80',
    tags: ['تند', 'پرفروش'],
    calories: 860,
    prepTime: '۱۸ دقیقه',
    rating: 4.85,
    ingredients: ['سالامی اسپیناتا', 'پنیر موزارلا', 'فلفل هالوپینو دودی', 'روغن چیلی']
  },
  {
    id: 'pizza-quattro-formaggi',
    name: 'Pizza Quattro Formaggi',
    persianName: 'پیتزا کواترو فورماجی (چهار پنیر)',
    category: 'pasta_pizza',
    price: 310000,
    priceFormatted: '۳۱۰,۰۰۰ تومان',
    description: 'ترکیب اعلای پنیرهای موزارلا، گورگونزولا دولچه، فونتینا و پارمیجانو رجیانو با گردوی برشته و عسل اکالیپتوس.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    tags: ['گیاهی', 'لوکس'],
    calories: 910,
    prepTime: '۱۵ دقیقه',
    rating: 4.75,
    ingredients: ['پنیر موزارلا', 'پنیر بلوچیز گورگونزولا', 'پنیر فونتینا آلپاین', 'پارمزان کهنه', 'گردو کاراملی']
  },

  // غذاهای اصلی
  {
    id: 'kebab-koobideh',
    name: 'Authentic Koobideh Kebab',
    persianName: 'کباب کوبیده اصیل',
    category: 'mains',
    price: 450000,
    priceFormatted: '۴۵۰,۰۰۰ تومان',
    description: 'دو سیخ کباب کوبیده مخصوص با گوشت تازه گوسفندی و گوساله، همراه با برنج زعفرانی هاشمی، گوجه کبابی و کره محلی.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
    tags: ['غذای اصیل', 'ویژه نورا و نوبل', 'زعفرانی'],
    isSpecial: true,
    calories: 950,
    prepTime: '۲۰-۲۵ دقیقه',
    rating: 5.0,
    ingredients: ['راسته و قلوه‌گاه گوسفندی تازه', 'برنج دمسیاه هاشمی درجه یک', 'زعفران ممتاز قائنات', 'سماق کوهی تبریز', 'کره حیوانی اعلا']
  },
  {
    id: 'filet-mignon',
    name: 'Filet Mignon al Pepe Verde',
    persianName: 'استیک فیله مینیون با سس فلفل سبز',
    category: 'mains',
    price: 680000,
    priceFormatted: '۶۸۰,۰۰۰ تومان',
    description: '۲۸۰ گرم مغز فیله گوساله آنگوس گریل شده، با سس فلفل سبز ماداگاسکار و پوره سیب‌زمینی ترافلی دست‌ساز.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    tags: ['لوکس', 'پروتئین بالا'],
    isSpecial: true,
    calories: 720,
    prepTime: '۲۰ دقیقه',
    rating: 4.9,
    ingredients: ['فیله گوساله بلک آنگوس', 'سس فلفل سبز تازه', 'خامه غلیظ سرشیر', 'پوره ترافل']
  },
  {
    id: 'shishlik-kebab',
    name: 'VIP Shishlik Rib Kebab',
    persianName: 'شیشلیک شاندیز ممتاز',
    category: 'mains',
    price: 720000,
    priceFormatted: '۷۲۰,۰۰۰ تومان',
    description: 'شش قطعه راسته با دنده گوسفندی طعم‌دار شده با آب پیاز، زعفران اعلا و فلفل سیاه، گریل شده روی زغال چوب طبیعی.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    tags: ['کباب سنتی', 'گوشت تازه'],
    calories: 1050,
    prepTime: '۲۵ دقیقه',
    rating: 4.95,
    ingredients: ['دنده گوسفندی شاندیزی', 'پیاز سفید خرد شده', 'زعفران سرگل', 'کره محلی']
  },
  {
    id: 'salmon-mediterranean',
    name: 'Salmone alla Griglia',
    persianName: 'فیله سالمون گریل مدیترانه‌ای',
    category: 'mains',
    price: 540000,
    priceFormatted: '۵۴۰,۰۰۰ تومان',
    description: 'فیله سالمون تازه نروژی با روکش سبزیجات معطر، سس لیمو و کاپاریس، همراه با مارچوبه و کدو گریل شده.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80',
    tags: ['دریایی', 'سالم', 'امگا۳'],
    calories: 580,
    prepTime: '۱۸ دقیقه',
    rating: 4.85,
    ingredients: ['سالمون نروژی سوپریم', 'کاپاریس سیسیلی', 'روغن زیتون لیمو', 'مارچوبه تازه']
  },

  // دسرها
  {
    id: 'chocolate-cake',
    name: 'Dark Chocolate Mousse Cake',
    persianName: 'کیک شکلات تلخ بلژیکی',
    category: 'desserts',
    price: 180000,
    priceFormatted: '۱۸۰,۰۰۰ تومان',
    description: 'موس شکلات تلخ بلژیکی ۷۰٪ با روکش گلیز براق، همراه با ورق طلای خوراکی و سس تمشک تازه.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    tags: ['شکلاتی', 'دست‌ساز', 'لوکس'],
    isSpecial: true,
    calories: 420,
    prepTime: '۵-۱۰ دقیقه',
    rating: 4.95,
    ingredients: ['شکلات کالیبائو ۷۰٪ بلژیک', 'ورق طلای ۲۴ عیار خوراکی', 'پوره تمشک جنگلی', 'خامه تازه']
  },
  {
    id: 'tiramisu-classico',
    name: 'Tiramisù Classico Veneziano',
    persianName: 'تیرامیسو کلاسیک ونیزی',
    category: 'desserts',
    price: 160000,
    priceFormatted: '۱۶۰,۰۰۰ تومان',
    description: 'بیسکویت لیدی‌فینگر آغشته به اسپرسوی تازه دم، کرم ماسکارپونه مخملی و پودر کاکائوی دارک والروهنا.',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80',
    tags: ['دسرهای محبوب', 'اصیل ایتالیایی'],
    calories: 390,
    prepTime: '۵ دقیقه',
    rating: 4.9,
    ingredients: ['پنیر ماسکارپونه لومباردی', 'اسپرسو دوبل تخصصی', 'لیدی فینگر ساوویاردی', 'کاکائو والروهنا']
  },
  {
    id: 'baklava-pistachio',
    name: 'Pistachio Baklava with Saffron Ice Cream',
    persianName: 'باقلوا پسته با بستنی سنتی زعفرانی',
    category: 'desserts',
    price: 195000,
    priceFormatted: '۱۹۵,۰۰۰ تومان',
    description: 'لایه‌های نازک خمیر یوفکا کره‌ای پر شده با مغز پسته تازه رفسنجان و شربت گلاب، همراه با بستنی سنتی خامه دار.',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80',
    tags: ['سنتی ممتاز', 'پسته اعلا'],
    calories: 480,
    prepTime: '۵ دقیقه',
    rating: 4.88,
    ingredients: ['پسته سبز اعلای کرمان', 'شربت هل و گلاب ناب کاشان', 'خمیر فیلو کره‌ای', 'بستنی سنتی سرشیردار']
  },

  // پیش‌غذا
  {
    id: 'bruschetta-pomodoro',
    name: 'Bruschetta al Pomodoro e Burrata',
    persianName: 'بروسکتا گوجه و بوراتا',
    category: 'starters',
    price: 150000,
    priceFormatted: '۱۵۰,۰۰۰ تومان',
    description: 'نان چاباتا برشته شده با سیر، گوجه گیلاسی مرینیت شده با بالزامیک کهنه مودنا، پنیر بوراتای خرد شده و ریحان تازه.',
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=600&q=80',
    tags: ['گیاهی', 'سبک'],
    isSpecial: true,
    calories: 320,
    prepTime: '۱۰ دقیقه',
    rating: 4.8,
    ingredients: ['نان چاباتا آرتیسان', 'گوجه گیلاسی ارگانیک', 'سرکه بالزامیک ۱۲ ساله مودنا', 'بوراتا تازه']
  },
  {
    id: 'mirza-ghasemi',
    name: 'Mirza Ghasemi Tradizionale',
    persianName: 'میرزاقاسمی دودی گیلان',
    category: 'starters',
    price: 140000,
    priceFormatted: '۱۴۰,۰۰۰ تومان',
    description: 'بادمجان کباب شده روی هیزم با عطر دود ناب، سیر تازه تفت داده شده، گوجه فرنگی رنده شده و تخم‌مرغ محلی همراه نان داغ.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    tags: ['شمالی اصیل', 'دودی'],
    calories: 280,
    prepTime: '۱۰ دقیقه',
    rating: 4.9,
    ingredients: ['بادمجان قلمی کبابی', 'سیر تازه لشت نشا', 'گوجه فرنگی رسی', 'تخم‌مرغ زرده طلایی']
  },
  {
    id: 'carpaccio-manzo',
    name: 'Carpaccio di Manzo al Tartufo',
    persianName: 'کارپاچیو فیله گوساله با ترافل',
    category: 'starters',
    price: 260000,
    priceFormatted: '۲۶۰,۰۰۰ تومان',
    description: 'برش‌های بسیار نازک فیله گوساله خام مرینیت شده با آب لیموی سیسیلی، پرک‌های پارمزان، کاپاریس و روغن ترافل سفید.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    tags: ['آشپزی کلاسیک', 'لوکس'],
    calories: 290,
    prepTime: '۸ دقیقه',
    rating: 4.75,
    ingredients: ['فیله گوساله تازه', 'پارمزان ۳۰ ماهه', 'روغن ترافل سفید آلبا', 'راکت / شاهی ارگانیک']
  },

  // نوشیدنی‌ها
  {
    id: 'drink-saffron-mojito',
    name: 'Royal Saffron Lime Mocktail',
    persianName: 'موکتیل سلطنتی زعفران و لیمو',
    category: 'drinks',
    price: 110000,
    priceFormatted: '۱۱۰,۰۰۰ تومان',
    description: 'عصاره غلیظ زعفران قائنات، آب لیمو ترش تازه سنگی، نعناع تازه کوبیده شده، شهد نسترن و آب گازدار سودا.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    tags: ['دست‌ساز', 'خنک‌کننده', 'بدون الکل'],
    isSpecial: true,
    calories: 120,
    prepTime: '۵ دقیقه',
    rating: 4.9,
    ingredients: ['زعفران درجه یک قائنات', 'لیموترش تازه شیراز', 'نعناع مراکشی', 'شربت نسترن']
  },
  {
    id: 'espresso-doppio',
    name: 'Espresso Doppio Artigianale',
    persianName: 'اسپرسو دوبل تخصصی ناپل',
    category: 'drinks',
    price: 85000,
    priceFormatted: '۸۵,۰۰۰ تومان',
    description: 'عصاره‌گیری از بلند ۱۰۰٪ عربیکا خاستگاه آمریکای جنوبی و اتیوپی، بادی سنگین با نت‌های شکلات تلخ و کارامل.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    tags: ['قهوه تخصصی', 'کافئین'],
    calories: 5,
    prepTime: '۳ دقیقه',
    rating: 4.95,
    ingredients: ['دان ۱۰۰٪ عربیکا برشته‌کاری مدیوم دارک']
  },
  {
    id: 'drink-pomegranate-berry',
    name: 'Wild Pomegranate & Berry Fizz',
    persianName: 'فیز انار ساوه و بری‌های جنگلی',
    category: 'drinks',
    price: 125000,
    priceFormatted: '۱۲۵,۰۰۰ تومان',
    description: 'آب انار طبیعی یاقوتی ساوه با سیروپ دست‌ساز بلوبری، رزماری دودی و سودای گازدار به همراه یخ‌های میوه‌ای کریستالی.',
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80',
    tags: ['طبیعی', 'پرفروش'],
    calories: 140,
    prepTime: '۵ دقیقه',
    rating: 4.85,
    ingredients: ['آب انار خالص ترش و شیرین', 'بلوبری و تمشک', 'شاخه رزماری معطر']
  }
];

export const CATEGORIES = [
  { id: 'all', persianName: 'همه غذاها', name: 'All' },
  { id: 'starters', persianName: 'پیش‌غذا', name: 'Antipasti / Starters' },
  { id: 'mains', persianName: 'غذاهای اصلی', name: 'Main Courses' },
  { id: 'pasta_pizza', persianName: 'پاستا و پیتزا', name: 'Pasta & Pizza' },
  { id: 'desserts', persianName: 'دسرها', name: 'Desserts' },
  { id: 'drinks', persianName: 'نوشیدنی‌ها', name: 'Beverages' }
];

export const RESTAURANT_STATS = [
  { id: 'years', value: '+۱۴', label: 'سال‌های برتری', englishLabel: 'Years of Excellence' },
  { id: 'dishes', value: '+۸۵', label: 'غذاهای ویژه', englishLabel: 'Signature Dishes' },
  { id: 'guests', value: '+۵۰,۰۰۰', label: 'میهمانان خوشحال', englishLabel: 'Happy Guests' },
  { id: 'awards', value: '+۱۸', label: 'جوایز آشپزی', englishLabel: 'Culinary Awards' }
];

export const WHY_CHOOSE_US = [
  {
    id: 'fresh_ingredients',
    title: 'مواد اولیه تازه',
    englishTitle: 'Fresh Ingredients',
    description: 'سبزیجات محلی، پنیرهای وارداتی و مواد اولیه ایتالیایی درجه یک با بالاترین استانداردهای بهداشتی.',
    icon: 'leaf'
  },
  {
    id: 'expert_chefs',
    title: 'آشپزهای ماهر',
    englishTitle: 'Master Chefs',
    description: 'سرآشپزهای مجرب متعهد به حفظ طعم‌های اصیل ایتالیایی و دستور پخت‌های میراث خانوادگی.',
    icon: 'utensils'
  },
  {
    id: 'top_quality',
    title: 'کیفیت عالی',
    englishTitle: 'Top Quality',
    description: 'هر غذا با بالاترین استانداردهای طعم، عطر، ارائه هنری و تازگی مطلق با نظارت مستقیم سرآشپز طبخ می‌شود.',
    icon: 'award'
  },
  {
    id: 'luxury_dining',
    title: 'غذاخوری لوکس',
    englishTitle: 'Luxury Dining',
    description: 'فضای داخلی زیبا، نورپردازی رمانتیک و صمیمی، مهمان‌نوازی گرم و تجربیات آشپزی فراموش‌نشدنی.',
    icon: 'coffee'
  }
];

export const CHEF_INFO = {
  name: 'سرآشپز مارکو دل لوکا و استاد سهراب نوبل',
  title: 'مدیر ارشد آشپزی و طراح منوی نورا و نوبل',
  experience: '+۲۵ سال تجربه آشپزی بین‌المللی',
  quote: 'آشپزی اصیل پلی است میان اصالت سنت‌های کهن و شور و اشتیاق خلق هنر معاصر.',
  highlights: [
    '+۲۵ سال تجربه در رستوران‌های برجسته اروپا و خاورمیانه',
    'غذاهای الهام گرفته از مکتب ستاره میشلن ناپل و رم',
    'دستور العمل‌های دست‌ساز اصیل با خمیر ترش اختصاصی ۴۸ ساعته'
  ],
  image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80'
};

export const GALLERY_IMAGES = [
  {
    id: 'gal-1',
    title: 'فضای سالن اصلی و نورپردازی شام',
    category: 'atmosphere',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gal-2',
    title: 'پخت پیتزا ناپلی در تنور هیزمی سنگی',
    category: 'kitchen',
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gal-3',
    title: 'آماده‌سازی پاستای دست‌ساز تازه',
    category: 'food',
    url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gal-4',
    title: 'کباب کوبیده زعفرانی روی زغال طبیعی',
    category: 'food',
    url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gal-5',
    title: 'میز اختصاصی VIP برای ضیافت‌های خصوصی',
    category: 'atmosphere',
    url: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'gal-6',
    title: 'موس شکلات تلخ با ورق طلای خوراکی',
    category: 'food',
    url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80'
  }
];
