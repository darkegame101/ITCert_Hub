const BLOG_DATA = {
    posts: [
        {
            id: 'benchmark-docker-network',
            title: 'Benchmark: Docker bridge vs host network vs CNI overlay',
            category: 'sysadmin',
            date: '03/01/2026',
            author: 'Nguyá»…n Thanh Tuáº¥n',
            thumbnail: 'assets/images/docker-benchmark.jpg',
            excerpt: 'ChÃªnh lá»‡ch hiá»‡u nÄƒng thá»±c táº¿ lá»›n Ä‘áº¿n Ä‘Ã¢u giá»¯a Docker Bridge, Host Network vÃ  CNI Overlay? Äo lÆ°á»ng Ä‘á»™ trá»… máº¡ng thá»±c táº¿.',
            content: `<p><strong>BÃ i viáº¿t chia sáº» káº¿t quáº£ benchmark tá»« anh Nguyá»…n Thanh Tuáº¥n trÃªn cá»™ng Ä‘á»“ng DevOps VN.</strong></p>

<img src="assets/images/docker-benchmark.jpg" alt="Benchmark" style="width:100%; border-radius:12px; margin-bottom:20px;">

<p>Hiá»‡n táº¡i Ä‘a pháº§n háº¡ táº§ng dÃ¹ng Kubernetes rá»“i cÃ³ máº¥y service tá»« lÃ¢u Ä‘ang cháº¡y thuáº§n Container vÃ  cÃ³ issue lÃ¢u lÃ¢u má»›i lÃªn chia sáº» cÃ¹ng vá»›i anh em.</p>

<p>TrÆ°á»›c tÃ´i khÃ´ng Ä‘á»ƒ Ã½ láº¯m tá»›i network mode cá»§a container, Há»‡ thá»‘ng cháº­m thÃ¬ thÆ°á»ng anh em sáº½ soi DB trÆ°á»›c, rá»“i tá»›i cache, rá»“i query, rá»“i code. Pháº§n network giá»¯a cÃ¡c service thÆ°á»ng bá»‹ xem lÃ  chuyá»‡n ná»n. CÃ³ overhead thÃ¬ cháº¯c cÃ³, nhÆ°ng cáº£m giÃ¡c nÃ³ khÃ´ng pháº£i thá»© táº¡o ra khÃ¡c biá»‡t lá»›n.</p>

<p>NhÆ°ng rá»“i Ä‘áº¿n má»™t dáº¡o trá»±c Jira ráº£nh ráº£nh ngá»“i xem p99 cá»§a má»™t há»‡ thá»‘ng ná»™i bá»™.</p>

<p>Há»‡ thá»‘ng Ä‘Ã³ khÃ´ng cÃ³ dáº¥u hiá»‡u ngháº½n rÃµ rÃ ng. CPU khÃ´ng cao. DB khÃ´ng cÄƒng. Redis cÅ©ng á»•n. NhÆ°ng cá»© vÃ o giá» nhiá»u traffic lÃ  p99 nháº£y lÃªn khÃ¡ khÃ³ chá»‹u. KhÃ´ng pháº£i kiá»ƒu sáº­p háº³n, chá»‰ lÃ  má»i thá»© máº¥t Ä‘á»™ mÆ°á»£t. Request nÃ o xui thÃ¬ cháº­m háº³n ra má»™t Ä‘oáº¡n.</p>

<p>LÃºc Ä‘áº§u tÃ´i cÅ©ng nghÄ© cháº¯c do app. Sau Ä‘Ã³ lÃ´i connection pool ra xem, rá»“i nhÃ¬n GC, rá»“i soi timeout giá»¯a cÃ¡c service. Cuá»‘i cÃ¹ng má»›i tháº¥y network path giá»¯a service nÃ y vá»›i service kia cÅ©ng gÃ³p pháº§n khÃ´ng nhá».</p>

<p>Tháº¿ lÃ  tÃ´i ngá»“i Ä‘o láº¡i cho rÃµ, vá»›i ba kiá»ƒu hay gáº·p nháº¥t:</p>

<p>Äiá»u tÃ´i muá»‘n biáº¿t khÃ¡ Ä‘Æ¡n giáº£n: vá»›i request nhá», gá»i qua gá»i láº¡i liÃªn tá»¥c giá»¯a cÃ¡c service, thÃ¬ pháº§n chÃªnh nÃ y thá»±c táº¿ lá»›n Ä‘áº¿n Ä‘Ã¢u. Nháº¥t lÃ  á»Ÿ p95 vá»›i p99.</p>

<h2>Bá»‘i cáº£nh bÃ i benchmark</h2>

<p>Case tÃ´i dÃ¹ng cÅ©ng khÃ´ng cÃ³ gÃ¬ láº¡.</p>

<p>Má»™t service A gá»i sang service B báº±ng HTTP ná»™i bá»™. Request JSON khoáº£ng 1KB. Response cÅ©ng cá»¡ Ä‘Ã³. TÃ´i bá» TLS ra Ä‘á»ƒ nhÃ¬n cho sáº¡ch pháº§n network, Ä‘á»¡ trá»™n thÃªm chi phÃ­ mÃ£ hÃ³a. BÃªn service nháº­n cÅ©ng lÃ m ráº¥t Ã­t viá»‡c, gáº§n nhÆ° nháº­n request xong tráº£ response láº¡i luÃ´n.</p>

<p>Ã lÃ  tÃ´i khÃ´ng muá»‘n benchmark framework hay business logic. TÃ´i chá»‰ muá»‘n bÃ³c pháº§n network giá»¯a service vá»›i service ra nhÃ¬n riÃªng.</p>

<p>TÃ´i cháº¡y hai tÃ¬nh huá»‘ng.</p>

<p>Má»™t lÃ  hai service náº±m cÃ¹ng má»™t node. Case nÃ y ngoÃ i Ä‘á»i gáº·p khÃ¡ nhiá»u, nháº¥t lÃ  khi há»‡ thá»‘ng cÃ²n chÆ°a lá»›n hoáº·c scheduler Ä‘áº·t trÃ¹ng mÃ¡y.</p>

<p>Hai lÃ  hai service náº±m khÃ¡c node. CÃ¡i nÃ y má»›i sÃ¡t production hÆ¡n, vÃ¬ khi Ä‘Ã£ scale ra vÃ i mÃ¡y thÃ¬ chuyá»‡n gá»i khÃ¡c node lÃ  bÃ¬nh thÆ°á»ng.</p>

<p>MÃ¡y test lÃ  8 vCPU, 16GB RAM, 10GbE. Má»—i bÃ i tÃ´i warm-up 10 giÃ¢y, Ä‘o 60 giÃ¢y, cháº¡y 5 vÃ²ng rá»“i láº¥y median. Client benchmark náº±m á»Ÿ mÃ¡y riÃªng Ä‘á»ƒ Ä‘á»¡ áº£nh hÆ°á»Ÿng láº«n nhau.</p>

<h2>Ba kiá»ƒu network tÃ´i Ä‘em ra so</h2>

<p>Bridge thÃ¬ cháº¯c ai cháº¡y Docker cÅ©ng quen. ÄÃ¢y lÃ  mode máº·c Ä‘á»‹nh. Container cÃ³ network namespace riÃªng, Ä‘i qua bridge cá»§a host, thÆ°á»ng kÃ¨m theo NAT vÃ  conntrack trong Ä‘Æ°á»ng Ä‘i.</p>

<p>Host network thÃ¬ Ä‘Æ¡n giáº£n hÆ¡n nhiá»u. Container dÃ¹ng tháº³ng network stack cá»§a host. Ãt lá»›p hÆ¡n, Ã­t xá»­ lÃ½ hÆ¡n, bÃ¹ láº¡i pháº§n cÃ¡ch ly máº¡ng cÅ©ng kÃ©m Ä‘i.</p>

<p>Overlay thÃ¬ tÃ´i test theo kiá»ƒu phá»• biáº¿n trong cluster multi-node, dáº¡ng VXLAN. CÃ¡i Ä‘Æ°á»£c lÃ  network model gá»n hÆ¡n khi cháº¡y nhiá»u node. CÃ¡i máº¥t lÃ  packet pháº£i Ä‘i vÃ²ng hÆ¡n vÃ  thÃªm vÃ i lá»›p xá»­ lÃ½.</p>

<h2>Káº¿t quáº£ khi hai service náº±m cÃ¹ng node</h2>

<p>Báº£ng Ä‘áº§u tiÃªn ra khÃ¡ Ä‘Ãºng vá»›i nhá»¯ng gÃ¬ tÃ´i Ä‘oÃ¡n, nhÆ°ng má»©c chÃªnh khÃ´ng Ä‘áº¿n má»©c quÃ¡ ghÃª gá»›m.</p>

<p>Host network Ä‘áº¹p nháº¥t, cÃ¡i nÃ y khÃ´ng cÃ³ gÃ¬ báº¥t ngá».</p>

<p>Bridge tháº¥p hÆ¡n má»™t chÃºt. p99 tá»« 1.60ms lÃªn 2.10ms. Overlay lÃªn 2.70ms.</p>

<p>Äiá»u tÃ´i tháº¥y Ä‘Ã¡ng nÃ³i lÃ  bridge thá»±c ra á»•n hÆ¡n nhiá»u ngÆ°á»i hay nghÄ©. Náº¿u chá»‰ nhÃ¬n case cÃ¹ng node thÃ¬ tÃ´i khÃ´ng tháº¥y lÃ½ do gÃ¬ pháº£i dá»‹ á»©ng vá»›i nÃ³ cáº£. NÃ³ khÃ´ng Ä‘áº¹p báº±ng host network, nhÆ°ng cÅ©ng chÆ°a Ä‘á»§ tá»‡ Ä‘á»ƒ thÃ nh váº¥n Ä‘á» trong Ä‘a sá»‘ há»‡ thá»‘ng bÃ¬nh thÆ°á»ng.</p>

<p>Overlay thÃ¬ báº¯t Ä‘áº§u lá»™ giÃ¡ rá»“i. DÃ¹ váº­y, náº¿u chá»‰ dá»«ng á»Ÿ case cÃ¹ng node thÃ¬ váº«n chÆ°a tháº¥y nÃ³ Ä‘Ã¡ng sá»£.</p>

<h2>Sang case khÃ¡c node má»›i báº¯t Ä‘áº§u tháº¥y rÃµ</h2>

<p>KhÃ¡c biá»‡t lá»™ ra rÃµ hÆ¡n khi request pháº£i Ä‘i tá»« mÃ¡y nÃ y sang mÃ¡y kia.</p>

<p>Äáº¿n Ä‘Ã¢y thÃ¬ tÃ´i gáº§n nhÆ° khÃ´ng cÃ²n quan tÃ¢m p50 ná»¯a. p50 váº«n khÃ¡ hiá»n. Táº¥t cáº£ váº«n quanh 1ms Ä‘áº¿n 1.5ms. Náº¿u chá»‰ nhÃ¬n median thÃ¬ ráº¥t dá»… káº¿t luáº­n lÃ  network mode khÃ´ng áº£nh hÆ°á»Ÿng bao nhiÃªu.</p>

<p>NhÆ°ng nhÃ¬n sang p99 thÃ¬ cÃ¢u chuyá»‡n khÃ¡c háº³n.</p>

<p>Host network á»Ÿ 4.8ms. Bridge lÃªn 6.9ms. Overlay lÃªn 10.8ms.</p>

<p>Má»™t hop thÃ¬ con sá»‘ nÃ y cÃ³ thá»ƒ váº«n chá»‹u Ä‘Æ°á»£c. NhÆ°ng há»‡ thá»‘ng microservice hiáº¿m khi chá»‰ cÃ³ má»™t hop. Má»™t request Ä‘i qua gateway, auth, user service, rá»“i thÃªm má»™t hai service phá»¥ ná»¯a thÃ¬ pháº§n xáº¥u nháº¥t cá»§a tá»«ng hop cá»™ng láº¡i ráº¥t nhanh. ÄÃ³ lÃ  lÃºc cáº£ há»‡ thá»‘ng báº¯t Ä‘áº§u cho cáº£m giÃ¡c Ã¬ ra dÃ¹ nhÃ¬n tá»«ng chá»— riÃªng láº» chÆ°a cháº¯c tháº¥y ngháº½n.</p>

<p>TÃ´i nghÄ© Ä‘Ã¢y lÃ  chá»— nhiá»u team dá»… bá» sÃ³t nháº¥t. Má»—i service nhÃ¬n riÃªng Ä‘á»u cÃ³ váº» á»•n. NhÆ°ng pháº§n latency xáº¥u cá»§a tá»«ng hop cá»™ng láº¡i thÃ¬ khÃ´ng á»•n chÃºt nÃ o.</p>

<h2>TÃ´i thá»­ thÃªm burst traffic</h2>

<p>Production khÃ´ng cháº¡y Ä‘á»u nhÆ° mÃ¡y phÃ¡t nhá»‹p, nÃªn tÃ´i thÃªm má»™t bÃ i ná»¯a. Traffic tÄƒng gáº¥p Ä‘Ã´i trong má»™t Ä‘oáº¡n ngáº¯n rá»“i háº¡ xuá»‘ng láº¡i.</p>

<p>Báº£ng nÃ y nhÃ¬n phÃ¡t ra váº¥n Ä‘á» luÃ´n.</p>

<p>LÃºc cÃ³ burst thÃ¬ overlay báº¯t Ä‘áº§u lá»™ rÃµ nhÆ°á»£c Ä‘iá»ƒm hÆ¡n háº³n. p99 gáº§n 19ms, trong khi host network váº«n dÆ°á»›i 8ms.</p>

<p>ÄÃ¢y lÃ  Ä‘oáº¡n lÃ m tÃ´i tháº¥y network mode khÃ´ng cÃ²n lÃ  chi tiáº¿t nhá» ná»¯a. Náº¿u service cá»§a má»i ngÆ°á»i gá»i nhau nhiá»u, request nhá», concurrency cao, thÃ¬ network path hoÃ n toÃ n cÃ³ thá»ƒ Äƒn vÃ o Ä‘á»™ trá»… cuá»‘i cÃ¹ng nhiá»u hÆ¡n mÃ¬nh tÆ°á»Ÿng.</p>

<h2>VÃ¬ sao overlay váº¥n Ä‘á» nháº¥t</h2>

<p>Tháº­t ra overlay cháº­m hÆ¡n cÅ©ng khÃ´ng cÃ³ gÃ¬ oan cho nÃ³. NÃ³ Ä‘ang giáº£i má»™t bÃ i toÃ¡n khÃ³ hÆ¡n.</p>

<p>Khi dÃ¹ng overlay, má»i ngÆ°á»i Ä‘ang Ä‘á»•i láº¥y:</p>

<p>Äá»•i láº¡i packet pháº£i Ä‘i qua thÃªm encapsulation, decapsulation, routing, policy vÃ  má»™t loáº¡t xá»­ lÃ½ ná»¯a.</p>

<p>Vá»›i request nhá», máº¥y pháº§n chi phÃ­ cá»‘ Ä‘á»‹nh kiá»ƒu nÃ y lá»™ ra ráº¥t nhanh. KhÃ´ng pháº£i do thiáº¿u bÄƒng thÃ´ng. Chá»§ yáº¿u lÃ  vÃ¬ báº£n thÃ¢n request quÃ¡ ngáº¯n. Chá»‰ cáº§n thÃªm má»™t Ã­t xá»­ lÃ½ vÃ o má»—i hop lÃ  nhÃ¬n ra ngay.</p>

<h2>CÃ³ nÃªn dÃ¹ng host network cho má»i thá»© khÃ´ng</h2>

<p>Káº¿t luáº­n má»™t cÃ¡i gÃ¬ Ä‘Ã³ Ã¡p dá»¥ng táº¥t cáº£ thÃ¬ chÆ°a hay rá»“i.</p>

<p>Host network Ä‘Ãºng lÃ  Ä‘áº¹p nháº¥t náº¿u chá»‰ nhÃ¬n latency. NhÆ°ng nÃ³ cÅ©ng mang theo má»™t loáº¡t thá»© khÃ´ng vui láº¯m. Port Ä‘á»¥ng nhau dá»… hÆ¡n. CÃ¡ch ly máº¡ng kÃ©m hÆ¡n. Váº­n hÃ nh container cÅ©ng máº¥t Ä‘i má»™t pháº§n tiá»‡n.</p>

<p>Bridge thÃ¬ á»Ÿ giá»¯a vÃ  khÃ¡ cÃ¢n báº±ng. Náº¿u há»‡ thá»‘ng cháº¡y Ã­t node hoáº·c chÆ°a quÃ¡ nháº¡y p99, tÃ´i tháº¥y bridge Ä‘á»§ á»•n cho ráº¥t nhiá»u case.</p>

<p>Overlay thÃ¬ Ä‘Æ°Æ¡ng nhiÃªn Ä‘áº¯t hÆ¡n vá» latency, nháº¥t lÃ  lÃºc Ä‘i khÃ¡c node. NhÆ°ng náº¿u Ä‘ang cháº¡y cluster nhiá»u node thÃ¬ nhiá»u khi Ä‘Ã³ lÃ  cÃ¡i giÃ¡ pháº£i tráº£ Ä‘á»ƒ Ä‘á»•i láº¥y sá»± linh hoáº¡t lÃºc váº­n hÃ nh. LÃºc nÃ y cÃ¢u há»i há»£p lÃ½ hÆ¡n thÆ°á»ng lÃ  service nÃ o Ä‘á»§ nháº¡y Ä‘á»ƒ mÃ¬nh pháº£i tá»‘i Æ°u riÃªng cho nÃ³, chá»© khÃ´ng pháº£i cÃ³ nÃªn vá»©t overlay Ä‘i háº¿t hay khÃ´ng.</p>

<h2>VÃ i Ä‘iá»u sau bÃ i test nÃ y</h2>

<p>Äiá»u Ä‘Ã¡ng nhá»› nháº¥t khÃ´ng pháº£i lÃ  host network Ä‘á»©ng Ä‘áº§u. CÃ¡i Ä‘Ã³ quÃ¡ dá»… Ä‘oÃ¡n.</p>

<p>Thá»© Ä‘Ã¡ng nhá»› hÆ¡n lÃ  bridge khÃ´ng tá»‡ nhÆ° tÃ´i tá»«ng nghÄ©. CÃ²n overlay thÃ¬ cÃ¡i giÃ¡ cá»§a nÃ³ lá»™ máº¡nh nháº¥t á»Ÿ p95 vá»›i p99, nháº¥t lÃ  khi khÃ¡c node vÃ  cÃ³ burst traffic.</p>

<p>Náº¿u há»‡ thá»‘ng cá»§a má»i ngÆ°á»i Ã­t hop, timeout rá»™ng, khÃ´ng quÃ¡ nháº¡y vÃ i mili-giÃ¢y, cÃ³ thá»ƒ sá»± khÃ¡c biá»‡t nÃ y chÆ°a thÃ nh váº¥n Ä‘á».</p>

<p>NhÆ°ng náº¿u Ä‘ang cháº¡y má»™t Ä‘Ã¡m service gá»i nhau liÃªn tá»¥c, cÃ³ fan-out, cÃ³ retry, vÃ  tá»«ng tháº¯c máº¯c vÃ¬ sao há»‡ thá»‘ng khÃ´ng ngháº½n háº³n mÃ  váº«n khÃ´ng mÆ°á»£t, thÃ¬ network mode lÃ  má»™t thá»© ráº¥t Ä‘Ã¡ng mang ra Ä‘o láº¡i.</p>

<p>Sau láº§n nÃ y thÃ¬ tÃ´i khÃ´ng cÃ²n xem network giá»¯a cÃ¡c service lÃ  chuyá»‡n ná»n ná»¯a.</p>

<p>Host network váº«n lÃ  lá»±a chá»n Ä‘áº¹p nháº¥t náº¿u chá»‰ nhÃ¬n latency. Bridge lÃ  Ä‘iá»ƒm cÃ¢n báº±ng khÃ¡ á»•n. Overlay thÃ¬ khÃ´ng miá»…n phÃ­, vÃ  pháº§n tiá»n má»i ngÆ°á»i tráº£ thÆ°á»ng náº±m á»Ÿ p95 vá»›i p99 chá»© khÃ´ng náº±m á»Ÿ p50.</p>

<p>Cuá»‘i cÃ¹ng thÃ¬ cÅ©ng khÃ´ng cÃ³ Ä‘Ã¡p Ã¡n chung cho táº¥t cáº£. CÃ³ chá»— cáº§n sá»± Ä‘Æ¡n giáº£n. CÃ³ chá»— cáº§n sá»± linh hoáº¡t. CÃ³ chá»— chá»‰ cáº§n bá»›t vÃ i mili-giÃ¢y á»Ÿ pháº§n Ä‘uÃ´i lÃ  Ä‘á»§ khÃ¡c biá»‡t rá»“i.</p>

<p>Náº¿u muá»‘n ra quyáº¿t Ä‘á»‹nh cho Ä‘Ãºng, tá»‘t nháº¥t váº«n lÃ  Ä‘em workload tháº­t cá»§a há»‡ thá»‘ng mÃ¬nh ra Ä‘o. NhÆ°ng Ã­t nháº¥t sau bÃ i test nÃ y, tÃ´i tháº¥y pháº§n network giá»¯a service vá»›i service Ä‘Ã¡ng Ä‘á»ƒ nghiÃªm tÃºc hÆ¡n nhiá»u so vá»›i cÃ¡ch tÃ´i tá»«ng nghÄ©.</p>

<h2>ThÃ´ng tin ná»•i báº­t</h2>

<h2>Sá»± kiá»‡n phÃ¡t trá»±c tiáº¿pâ€‹</h2>

<h2>Sá»± kiá»‡n Ä‘ang hiá»‡n hÃ nh</h2>

<h2>Ná»™i dung ná»•i báº­t</h2>

<h2>BÃ i viáº¿t khÃ¡c</h2>

<p>DevOps VietNamCá»™ng Ä‘á»“ng DevOps VietNam - Káº¿t ná»‘i, há»£p tÃ¡c, chia sáº».</p>

<p>Â© 2017 devops.vn - Cá»™ng Ä‘á»“ng DevOps VietNam.</p>

<h2>Sá»± kiá»‡n Ä‘ang hiá»‡n hÃ nh</h2>

<h2>BÃ i viáº¿t má»›i nháº¥t</h2>

<p>' + scriptOptions._localizedStrings.webview_notification_text + '</p>

<p>" + scriptOptions._localizedStrings.redirect_overlay_title + "</p>

<p>" + scriptOptions._localizedStrings.redirect_overlay_text + "</p>`
        },
        {
            id: 'ccna-lo-trinh',
            title: 'Lá»™ TrÃ¬nh Há»c CCNA Tá»« Zero Ä‘áº¿n Pass Trong 3 ThÃ¡ng',
            category: 'cisco',
            date: '05/06/2026',
            author: 'Admin',
            thumbnail: 'assets/images/logo.png',
            excerpt: 'HÆ°á»›ng dáº«n chi tiáº¿t lá»™ trÃ¬nh há»c CCNA 200-301 cho ngÆ°á»i má»›i báº¯t Ä‘áº§u: tÃ i liá»‡u cáº§n cÃ³, lá»‹ch há»c hÃ ng ngÃ y, cÃ¡ch luyá»‡n lab...',
            content: '<p>Ná»™i dung Ä‘ang Ä‘Æ°á»£c cáº­p nháº­t...</p>'
        },
        {
            id: 'az900-meo',
            title: '10 Máº¹o VÃ ng Äá»ƒ Pass AZ-900 Ngay Láº§n Äáº§u',
            category: 'microsoft',
            date: '02/06/2026',
            author: 'Cloud Expert',
            thumbnail: 'assets/images/logo.png',
            excerpt: 'Nhá»¯ng kinh nghiá»‡m thá»±c táº¿ tá»« hÃ ng trÄƒm há»c viÃªn Ä‘Ã£ pass AZ-900. TÃ¢m lÃ½ thi, cÃ¡ch quáº£n lÃ½ thá»i gian vÃ  cÃ¡c domain...',
            content: '<p>Ná»™i dung Ä‘ang Ä‘Æ°á»£c cáº­p nháº­t...</p>'
        },
        {
            id: 'aws-saac03',
            title: 'AWS SAA-C03 Cáº­p Nháº­t Äá» Thi Má»›i - Thay Äá»•i Quan Trá»ng 2026',
            category: 'aws',
            date: '28/05/2026',
            author: 'AWS Mentor',
            thumbnail: 'assets/images/logo.png',
            excerpt: 'AWS vá»«a cáº­p nháº­t cáº¥u trÃºc Ä‘á» thi SAA-C03 vá»›i nhiá»u thay Ä‘á»•i vá» domain phÃ¢n bá»• vÃ  dáº¡ng cÃ¢u há»i má»›i...',
            content: '<p>Ná»™i dung Ä‘ang Ä‘Æ°á»£c cáº­p nháº­t...</p>'
        }
    ]
};

