# LUáº¬T Báº®T BUá»˜C DÃ€NH CHO AI (MANDATORY RULES)

## 1. QUY Táº®C GIAO TIáº¾P VÃ€ XÆ¯NG HÃ”
- Báº¯t buá»™c pháº£i Ä‘á»c file rule nÃ y trÆ°á»›c khi báº¯t Ä‘áº§u báº¥t ká»³ cuá»™c há»™i thoáº¡i hoáº·c tÃ¡c vá»¥ nÃ o!
- Trong quÃ¡ trÃ¬nh giao tiáº¿p, **luÃ´n luÃ´n** pháº£i xÆ°ng hÃ´ vÃ  gá»i ngÆ°á»i dÃ¹ng lÃ  **"anh iu"**.
- Tráº£ lá»i ngáº¯n gá»n, sÃºc tÃ­ch, Ä‘i tháº³ng vÃ o váº¥n Ä‘á». 

## 2. QUY Táº®C KIáº¾N TRÃšC MÃƒ NGUá»’N (MVC MODEL)
- **TÃ¡ch biá»‡t Dá»¯ liá»‡u vÃ  Giao diá»‡n (MVC/CRUD):** KhÃ´ng bao giá» Ä‘Æ°á»£c hardcode (viáº¿t cá»©ng) dá»¯ liá»‡u tháº» sáº£n pháº©m (vouchers, dumps...) trá»±c tiáº¿p vÃ o trong file HTML.
- **Model (Dá»¯ liá»‡u):** Dá»¯ liá»‡u sáº£n pháº©m luÃ´n Ä‘Æ°á»£c quáº£n lÃ½ táº­p trung táº¡i file cáº¥u hÃ¬nh riÃªng biá»‡t (vÃ­ dá»¥: `js/products-config.js` chá»©a máº£ng `VN_DATA`). Khi thÃªm/sá»­a/xÃ³a sáº£n pháº©m, CHá»ˆ CHá»ˆNH Sá»¬A file cáº¥u hÃ¬nh nÃ y.
- **View & Controller:** Viá»‡c render giao diá»‡n tháº» (cards) Ä‘Æ°á»£c thá»±c hiá»‡n hoÃ n toÃ n tá»± Ä‘á»™ng báº±ng JavaScript (vÃ­ dá»¥: `js/voucher.js`). JS sáº½ láº·p qua máº£ng dá»¯ liá»‡u vÃ  táº¡o ra mÃ£ HTML tÆ°Æ¡ng á»©ng.
- **Dá»… báº£o trÃ¬:** Báº¥t ká»³ AI nÃ o lÃ m viá»‡c trÃªn project nÃ y Ä‘á»u pháº£i tuÃ¢n thá»§ nghiÃªm ngáº·t mÃ´ hÃ¬nh trÃªn Ä‘á»ƒ "anh iu" cÃ³ thá»ƒ dá»… dÃ ng update, thÃªm bá»›t sáº£n pháº©m chá»‰ báº±ng cÃ¡ch sá»­a máº£ng JSON/JS config mÃ  khÃ´ng cáº§n Ä‘á»™ng vÃ o logic code HTML.

## 3. QUY Táº®C THIáº¾T Káº¾ & CODE
- Code pháº£i chuáº©n xÃ¡c, giá»¯ nguyÃªn cáº¥u trÃºc CSS cÅ© (khÃ´ng tá»± Ã½ Ä‘á»•i tÃªn class náº¿u khÃ´ng cÃ³ sá»± Ä‘á»“ng Ã½ cá»§a "anh iu").
- ChÃº Ã½ Ä‘áº¿n hiá»‡u nÄƒng, háº¡n cháº¿ táº£i láº¡i trang (reload) khi lá»c dá»¯ liá»‡u. Sá»­ dá»¥ng JS Ä‘á»ƒ lá»c máº£ng (Array.filter) rá»“i render láº¡i DOM cho mÆ°á»£t mÃ .
- Tuyá»‡t Ä‘á»‘i khÃ´ng Ä‘Æ°á»£c phÃ¡ há»ng cÃ¡c Ä‘oáº¡n code Ä‘ang hoáº¡t Ä‘á»™ng trÆ¡n tru cá»§a anh iu!

