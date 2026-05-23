# شخبطه 📝

موقع توثيق عربي مفتوح المصدر عن **Hyprland**، التوزيعات، الواجهات، والأدوات — يعمل على GitHub Pages بدون سيرفر أو قاعدة بيانات.

🌐 **الموقع:** [im-sheen.github.io/shakhbatah](https://im-sheen.github.io/shakhbatah/)

---

## كيف تضيف مقالة؟ 🚀

### ١. Fork المشروع
اضغط **Fork** في GitHub لتنسخ المشروع لحسابك.

### ٢. اختر القسم المناسب
| المجلد | القسم |
|--------|-------|
| `articles/` | Hyprland (إعداد وتخصيص) |
| `distros/` | التوزيعات (تثبيت، إدارة حزم) |
| `desktop/` | الواجهات (Waybar، Rofi، Ricing) |
| `tools/` | أدوات وطرفيات |

### ٣. أنشئ ملف المقالة
انسخ `articles/_TEMPLATE.html` إلى المجلد المناسب باسم وصفي:
```
articles/hyprland-animations.html
tools/neovim-setup.html
distros/fedora-install.html
```

### ٤. عدّل التعليق في أعلى الملف ⬇️

```html
<!--
  title: عنوان مقالتك
  description: وصف مختصر يظهر في البطاقة
  tag: التخصيص
  date: 2025-06-01
  icon: ✨
  author: اسمك أو نيكنيمك
  author-github: https://github.com/username
  author-twitter: https://x.com/username
  author-youtube: https://youtube.com/@username
  author-website: https://yoursite.com
  author-avatar: https://link-to-custom-avatar.png
-->
```

> **ملاحظة:** إذا أضفت `author-github`، سيجلب الموقع اسمك وصورتك وبايوك من GitHub تلقائياً — لا تحتاج تكتب شيئاً آخر.
> جميع حقول الكاتب اختيارية، لكن يُنصح بإضافة `author-github` على الأقل.

### ٥. سجّل المقالة في `assets/js/app.js`
افتح `assets/js/app.js` وأضف سطراً في `ALL_ARTICLES`:
```js
{ file: 'myarticle.html', section: 'tools' },
```

### ٦. افتح Pull Request
أرسل PR وسيظهر اسمك وصورتك في البطاقة تلقائياً! 🎉

---

## بنية المشروع 📁

```
shakhbatah/
├── index.html              ← الصفحة الرئيسية
├── articles/               ← مقالات Hyprland
│   ├── _TEMPLATE.html      ← قالب المقالة (انسخ منه)
│   └── index.html
├── distros/                ← التوزيعات
├── desktop/                ← الواجهات
├── tools/                  ← الأدوات
└── assets/
    ├── css/style.css       ← التصميم
    ├── js/app.js           ← المنطق + نظام الكُتّاب
    └── images/
```

---

## نظام الكُتّاب ✍️

كل مقالة تحمل `author-github` في التعليق أعلى الملف. الموقع يجلب البيانات تلقائياً من GitHub API ويعرض:

- **في البطاقة:** صورة الكاتب واسمه مع رابط لحسابه
- **في البحث:** يمكن البحث باسم الكاتب لإيجاد كل مقالاته

---

## زر التعديل ✏️

كل مقالة فيها زر **"عدّل هذه المقالة"** يفتح الملف مباشرة على GitHub للتعديل — سهولة المساهمة بأقل خطوات.

---

## المساهمون 🤝

شكراً لكل من ساهم بمقالة أو تحسين!

---

**الرخصة:** MIT
