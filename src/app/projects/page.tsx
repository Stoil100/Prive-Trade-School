"use client"
import { db } from "@/firebase/config";
import { Project } from "@/models/project";
import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";

export default function page() {
    const [projects,setProjects] = useState<Project[]>([]);
    useEffect(() => {
        const q = query(collection(db, "projects"));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const docs: Project[] = snapshot.docs.map(doc => ({
            ...doc.data() as Project,
          }));
          setProjects(docs);
        }, (error) => {
          console.error("Error fetching documents: ", error);
        });
    
        // Cleanup subscription on unmount
        return () => unsubscribe();
      }, []);
    return (
        <section className="bg-white p-6">
            <h1 className="mb-4 text-center text-6xl font-bold underline decoration-4">
                Проекти
            </h1>
            {projects.map((project, index) => (
                <div key={index}>
                    <h2 className="text-xl font-bold">{project.title}</h2>
                    <p className="px-2 text-gray-400">{project.id}</p>
                    <p className="text-md px-5 py-3">{project.description}</p>
                </div>
            ))}
            <div>
                <h2 className="text-xl font-bold">
                    &quot;ГЕОПАРКОВЕ – природно и културно наследство,
                    обединяващо ученици и учители от Европа“ /  GEOPARKS –
                    NATURAL AND CULTURAL HERITAGE THAT JOINS EUROPEAN STUDENTS
                    AND TEACHERS
                </h2>
                <p className="px-2 text-gray-400">
                    Номер на програма: 2018-1-PL01-KA229-050575_1
                </p>
                <p className="text-md px-5 py-3">
                    Международният европейски проект за обмен на опит и знания
                    между ученици от Полша, Испания, Франция, България, Унгария
                    и Кипър беше финансиран по програма Еразъм +. Те имаха
                    възможност да провеждат интердисциплинарни занимания по
                    Биология, Геология, География, Езиково обучение, Природни
                    науки и Изкуство. Всяка държава представяше и изследваше
                    своите геопаркове.Учениците посетиха всички държави от които
                    бяха партньорите,
                </p>
            </div>
            <div>
                <h2 className="text-xl font-bold">
                    „Ателие за проучване на испанския опит за ползите от
                    дуалното обучение и практиката в реална чуждоезикова работна
                    среда&quot;&quot;Workshop on Exploring the Spanish
                    Experience of the Benefits of Dual Education and Practice in
                    a Real Foreign Language Work Environment&quot;
                </h2>
                <p className="px-2 text-gray-400">
                    Номер на програма: 2017-1-BG01-KA102-035774
                </p>
                <p className="text-md px-5 py-3">
                    Целта на проекта беше да изследва как интегрираната практика
                    в реална работна среда в Испания спомага за подобряване
                    качеството на образованието и намаляване на безработицата
                    сред младежите. Частна Търговска Гимназия участваше като
                    партньор в консорциум, организиран от Хоризонт ПроКонсулт
                    ЕООД и Асоциация Мундус - Испания. Участниците 5 ученици от
                    специалност &quot;Банково дело“ бяха на 20-дневна
                    международна мобилност в Сарагоса, Испания. и получиха
                    Europass сертификати.
                </p>
            </div>
            <div className="w-full  border border-gray-300" />

            <div>
                <h2 className="text-xl font-bold">
                    Международни ориентирани към действие бизнес уроци
                </h2>
                <p className="text-gray-400">
                    Wirtschaftsunterricht international und handlungsorientiert
                    gestalten (WIN)
                </p>
                <p className="text-md px-5 py-3">
                    <span className="font-bold">Бенефициенти: </span> Институт
                    за икономическо образование в Олденбург- Германия,Свободен
                    университет Варна,фирма“ Старт ит смарт „Частна търговска
                    гимназия Варна,училище „Христо Ботев „ село Николаевка,
                    гимназията в Остенбург и училището в Бяла Подласка -Полша
                </p>
                <p className="text-md px-5 py-3">
                    <span className="font-bold">Дейности: </span>обучение на
                    учениците в часовете за извънкласна дейност по
                    предприемачество и бизнес планиране, срещи с бизнесмени и
                    общественици, Създаване на ученическа фирма „Евент
                    мениджмънт“. и защита на бизнес плана във Варненски свободен
                    университет Учебно тренировъчната фирма се регистрира в
                    Агенция по вписванията на Център на учебно –тренировъчните
                    фирми. Изх. №
                    20152016536 http://www.buct.org/index.php?p=&amp;lang=enФирмата
                    стартира и нейната дейност разнообрази ученическия училищен
                    живот и научи чрез метода на „действие“ на практически
                    знания по мениджмънт участващите в проекта ученици..
                </p>
                <h2 className="text-xl font-bold">
                    „Екологична и икономическа ефективност на финансовото
                    управление в бизнеса “
                </h2>
                <p className="text-md px-5 py-3">
                    Програма Еразъм +. Проектът на Частна Търговска Гимназия –
                    Варна бе насочен към усвояване на знания,  умения и
                    формиране на  нагласа  у  10 ученици от X - XII клас,
                    обучаващи се по специалност&quot; Банково дело&quot;,трета
                    квалификационна степен,   да управляват  процесите на
                    финансов мениджмънт  с цел  намаляване разходването на
                    природни  ресурси и прилагане на екологични и финансови 
                    решения за икономическа ефективност  във финансовите
                    институции и бизнеса.  Идеята включи мобилност с цел
                    обучение и практика на ученици в предоставените от партньора
                    „ MAD for EUROPE“ Испания, работни места в 10 финансови
                    институции в Мадрид. Посети се държава с традиции във
                    финансите и банките и се придобиха умения за реална работна
                    среда.
                </p>
                <h2 className="text-xl font-bold">
                    &quot;Иновативната икономика в туризма и морската индустрия
                    - поле за изява на младежки бизнес лидери”
                </h2>
                <p className="text-md px-5 py-3">
                    Проект по програма &quot;Еразъм +&quot;, КД 1 Сектор
                    &quot;Професионално образование и обучение&quot;. Проектът
                    „бе насочен към създаване на предприемачески умения на 10
                    ученици от XI и XII клас, обучаващи се по специалностите
                    &quot; Банково дело&quot; и &quot;Митнически и данъчен
                    контрол&quot;.Осъществи се мобилност с цел обучение и
                    практика на ученици в предоставените от партньора „Training
                    to Malta“ работни места във фирми от туристическата
                    индустрия и морската икономика на Малта. Посетиха се Cme
                    group, Valletta sms Group, Valletta Tourism school, Bujibba
                    Hotel, Chamber of tourism Malta, St.Julians public tourism
                    office, Labor office in Malta, Central Customs Office.
                </p>
                <h2 className="text-xl font-bold">
                    Проект &quot;Маре Нострум&quot;
                </h2>
                <p className="text-md px-5 py-3">
                    Проектът създаде партньорство между Европейски училища от
                    шест държави (Италия, Франция, Румъния, Португалия, България
                    и Гърция) с излаз на морски бряг на три морета и
                    Атлантическия океан. Основните дейности се сведоха до
                    проучвание и презентиране на морското био разнообразие в
                    различните морски басейни; провеждане на лабораторни
                    изследвания на екосистемите на морския бряг и анализ на
                    взаимното влияние на човешката дейност и Европейските
                    морета.
                </p>
                <h2 className="text-xl font-bold">
                    „Не бъди озадачен от различността“, проект финансиран от
                    Академия за централни европейски училища (ACES). ACES е една
                    инициатива на ERSTE Foundation, координирана от
                    Interkulturel Zentrum (Виена, Австрия) и VČELÍ DOM
                    (Братислава, Словакия).
                </h2>
                <p className="text-md px-5 py-3">
                    Училището акцентира над осъзнаване на индивидуалността и
                    приемане на различността у всеки човек без дискримация при
                    контакт с хора от други раси, етноси или в друго социално
                    положение. С цел пропагандиране на единното начало и
                    безрезервното приемането на „другия“ - различния, учениците
                    подготвиха 2 мини-документални откъси, които сами изработиха
                    по темата и като при пъзел съчетаха с тези, които техните
                    партньори от Словакия подготвиха и наприха цялостна пиеса.За
                    събиране на подготвителен материал за документалната част на
                    пиесата, по време на партньорската визита на ученици от
                    Словакия във Варна, всички участници посетиха разнообразни
                    институции с цел опознаване на различни действителности и
                    начин на живот. Някои от местата, които посетиха бяха СОУ
                    „Св. Св. Кирил и Методий“ в гр. Игнатиево, Карин Дом,
                    Държавен куклен театър Варна и Музей на куклите.
                    Партньорската среща и представление се проведе в Комарно,
                    Словакия.
                </p>
                <h2 className="text-xl font-bold">
                    &quot;Улови реалността- проактивно използвaне на дигиталните
                    медии&quot;, финансиран от Академия за централни европейски
                    училища» (ACES). 12 ученици, на възраст между 15 и 17 год от
                    Частна търговска гимназия Варна и гимназия «Овидиус»,
                    Констанца, Румъния
                </h2>
                <p className="text-md px-5 py-3">
                    Участниците придобиха технически и теоретични умения,
                    свързани с анализирането на медийни продукти и създаване на
                    собствени продукцииПолзваха се дигиталните канали като
                    средство за пропагандиране на идеи. Участниците от двата
                    града Варна и Констанца , Румъния, създадоха 5 мин филми на
                    тема « Екологична устойчивост в Черноморските
                    градове».Частна Търговска Гимназия бе координатор на проекта
                    и е подготви он-лайн обучение и уоркшопове във виртуална
                    класна стая, къдете участниците в проекта се обучиха на
                    основните принципи за създаване на късометражни филми и
                    видео продукции.
                </p>
                <h2 className="text-xl font-bold">
                    “Обединяване на усилията на младите хора с творчески заложби
                    в самоуправлението на малката община”
                </h2>
                <p className="text-md px-5 py-3">
                    Проектът бе с основна цел изработване на стратегия за
                    задържане и привличане на младите хора в община Вълчи дол,
                    област Варненска и създаване на модел за включване на
                    младежта при вземане на решения от местните органи на
                    управление. В резултат на проведените дейности се изпълни
                    целта и младите хора сами станаха организатори на условията
                    за своята реализация в малката община, където могат да
                    живеят и творят. Интерес представляваше проведеното
                    социологическо проучване на 1000 души на възраст от 16 до 40
                    г. за техните желания относно обогатяването на културния
                    живот в общината за да се превърне тя в притегателно място
                    за всички млади хора. Изграден бе клуб на творческата
                    интелигенция “Кръгозор” който се утвърди в последствие като
                    орган на самоуправление, партниращ успешно на общинската
                    власт при определянето на нейната социална и културна
                    политика.
                    <span>
                        Основен донор по проекта бе С.Ч.С.МОД и фондация
                        “Отворено общество” - Варна.
                    </span>
                </p>
                <h2 className="text-xl font-bold">
                    “Професионална мотивация за участие на млади хора в семеен
                    хотелиерски бизнес”
                </h2>
                <p className="text-md px-5 py-3">
                    Гимназията бе водеща, а неин партньор бе International House
                    Барселона. Участници в проекта бяха ученици от гимназията,
                    обучавани по специалност “Стопански мениджмънт”. Цел на
                    проекта е специализация на знания и придобиване на умения за
                    менажиране на семейни хотели, които да могат да посрещат и
                    обслужват туристи - инвалиди. Проекът се реализира на два
                    етапа - първият - проучване на проблема и даденостите на
                    България и Северното Черноморие, а вторият - едномесечен
                    престой в Испания, Барселона, където учениците подобриха
                    испанските си знания със специфични термини и придобиха
                    навици за работа с туристи със специфични заболявания.
                </p>
                <h2 className="text-xl font-bold">
                    “Евро-счетоводство и международни счетоводни стандарти”
                </h2>
                <p className="text-md px-5 py-3">
                    - Частна Търговска гимназия - партньор на Сдружение “Наш
                    свят” като основна цел на проекта бе развитие на уменията за
                    ползване на счетоводни програмни продукти, подобряване на
                    езиковите компетенции и знания на счетоводители за прилагане
                    на Международните счетоводни стандарти в условията на
                    синхронизирана с изискванията на ЕС нормативна счетоводна
                    уредба в България. Партньор на организациите бе
                    професионален център ForTESS, където учениците имаха
                    възможност чрез практика в кантори да бъдат обучени на нови
                    информационни технологии в счетоводството. Проведената
                    конференция в края на проекта - европейско хармонизиране на
                    счетоводната отчетност и развитие на информационните
                    технологии бе посрещната с интерес от действащи
                    счетоводители, ученици от професионални гимназии,
                </p>
                <h2 className="text-xl font-bold">
                    “Професионално обучение и мотивация за работа в хотелиерски
                    бизнес на дългосрочно безработни жени над 40 години с
                    икономическо образование”
                </h2>
                <p className="text-md px-5 py-3">
                    Основната цел на проекта е повишаване квалификацията на
                    безработни жени - икономически специалисти и формиране на
                    професионална мотивация за работа в хотелиерски и
                    ресторантьорски бизнес. Разработеният проект за
                    професионално обучение и мотивация ще повишава изискванията
                    към отчетността в туристическия сектор и отговоря на нуждите
                    на предприемачите за набиране на необходимия им
                    персонал.Участници бяха ученици от самостоятелна форма на
                    обучение
                </p>
                <h2 className="text-xl font-bold">
                    “Професионално обучение за счетоводители на младежи със
                    зрителни затруднения – слепи и слабо-виждащи, чрез говорещ
                    счетоводен софтуер”
                </h2>
                <p className="text-md px-5 py-3">
                    – Гимназията бе в ролята на водеща организация. Основната
                    цел на проекта бе придобиване на квалификационни счетоводни
                    знания и професионални умения от младежи със зрителни
                    увреждания чрез нов информационен канал – говорещи
                    компютърни програми и учебници. Провеждането на
                    професионално обучение на тези младежи бе много иновативно и
                    проктът бе вписан в Копендиума на ЕС.Проектът помана те да
                    приемат своето увреждане и използвайки интелектуалния си
                    ресурс да се включат активно в обществото, практикувайки
                    професията “счетоводител” – водене на отчетността на фирми
                    от малкия и средния бизнес, с помощта на популярни софтуерни
                    счетоводни продукти, адаптирани за слухово възприятие. Чрез
                    проекта се инициира модел “развиване на професионални умения
                    чрез остатъчни способности” и се създадоха нова методика,
                    уникални учебни помагала и дидактически средства за
                    професионално икономическо обучение на незрящи хора от
                    регионите Варна и Шумен.
                </p>
            </div>
        </section>
    );
}
