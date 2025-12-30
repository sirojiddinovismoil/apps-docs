# Express.js asosiy student API docs

Bu loyiha **Node.js va Express.js** yordamida yozilgan oddiy backend API hisoblanadi.
Loyiha orqali student qo‘shish va olish mumkin.

---
##  express.js nima🧐
> Ko'pincha oddiygina **Express** deb ataladigan Express.js veb-ilovalar va API'larni yaratish uchun mo'ljallangan minimal va moslashuvchan Node.js veb-ilovalar tizimidir. [ko'proq o'rganish](https://expressjs.com/)


## ✍️ misollar

#### 📌 Talablar

- Node.js (18+ tavsiya etiladi)
- npm (Node bilan birga keladi)
---
#### 📥 ornatish

```bash
$ npm init -y
$ npm install express
```
---
**express kutubkonasini import qilmoqilnadi uni qobilyatlaridan foydalanish uchun**
>import exspress from "express"
---

**app ozgaruvchisiga express server funksiyasini biriktirmoqdamiz**
```js
const app =exspress();
```
---
**port o'zgaruvchisiga 8080 qiymati biriktirilmoqda**
```js
const port=8080;
```
---
**asosiy end point foydalanuvchiga kritilgan malumotni qaytaradi va so'rovni yakunlaydi**
```js
app.get('/',(req,res)=>{
    res.end('server is runing')
});
```
---
**malumotlarni vaqtincha saqlash uchun array**
```js
const data=[];
```
---
**yangi studentlar royxatini qoshish**
```js
app.post('student',(req,res)=>{
    // Foydalanuvchi yuborgan ma’lumotlarni olamiz va unga hozirgi vaqt asosida unikal ID qo‘shib yangi obyekt hosil qilinadi
    const temp={...req.body, id: new Date().getTime} 

    // arrayga qo'shish uchun
    data.push(temp);

    //Server javob yuboradi, status 201 (yaratildi) va javob matn sifatida bo‘ladi
    res.writeHead(201,{"content-type":"text/plain"});

    //muafaqiyatli javob qaytarildi
    res.end("accepted");
})
```
---
**barcha studentlar royhatini olish uchun end point**
```js
app.get('students',(req,res)=>{
    res.send(data);
});
```
---
**id param  orqali kerakli royhatlarni olish**
```js
app.get('student/:id',(req, res)=>{
   //malumotlar ichidan kritilgan id ga asoslanib saralab olish va ozgaruvchiga saqlash
   const result= data.filter((el)=>el.id=req.params.id);

   //topilgan birinchi qiymatni qaytaradi topilmasa not found
   res.send(result.length?result[0]:"not found");
});
```
---
**Bu kod serverni ishga tushiradi va terminalda ‘server qaysi manzilda ishlayapti’ degan xabarni chiqaradi**
```js
app.listen(port, () => {
console.log(`our node project at http://localhost:${port}`);
});
```
---

#### 💻 main.js toliq kod
```js
import exspress from "express"

const app =exspress();
const port =8080;

app.get('/',(req,res)=>{
    res.send('server is runing')
});

const data=[];

app.post('student',(req,res)=>{
    const temp={...req.body, id: new Date().getTime} 

    data.push(temp)

    res.writeHead(201,{"content-type":"text/plain"})
    res.end('acsepted')
})

app.get('students',(req,res)=>{
    res.send(data)
})

app.get('student/:id',(req, res)=>{
   const result= data.filter((el)=>el.id=req.params.id)
   res.send(result.length?result[0]:"not found")
})


app.listen(port, () => {
console.log(`our node project at http://localhost:${port}`);
});
```












