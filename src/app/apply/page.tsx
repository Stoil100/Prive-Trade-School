import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Apply() {
    return (
        <section className="bg-white px-4 md:px-12 py-6 space-y-10">
          <div className="space-y-2">
            <div>
                <h2 className="text-center text-3xl lg:text-7xl font-bold">
                    Kандидатстване
                </h2>
                <p className="px-6 py-3 text-md md:text-xl">
                    За да кандидатствате в ЧТГ „Конто Трейд“, можете да
                    попълните форма онлайн или да изтеглите, попълните и
                    изпратите документи за кандидатстване на
                    <a href="mailto:privatetradeschool@gmail.com" className="cursor-pointer font-bold text-blue-500">
                        {" "}
                        privatetradeschool@gmail.com
                    </a>
                </p>
            </div>
            <div>
                <h4 className="text-xl lg:text-4xl font-bold">
                    Документи за кандидатстване
                </h4>
                <ul className="list-disc px-10 py-4 ">
                    <li>
                        Заявление до директора на училището – по образец ИЗТЕГЛИ
                        ЗАЯВЛЕНИЕ
                    </li>
                    <li>Декларация от родител ИЗТЕГЛИ ДЕКЛАРАЦИЯ</li>
                    <li>
                        Копие от Свидетелство за основно образование или
                        бележник с оценките от I срок на 7 клас – приложете
                        сканирания документ
                    </li>
                </ul>
                <h4 className="text-xl lg:text-4xl  font-bold">Документи за записване:</h4>
                <ul className="list-disc px-10 py-4">
                    <li>
                        Заявление до директора на училището – по образец ИЗТЕГЛИ
                        ЗАЯВЛЕНИЕ
                    </li>
                    <li>Оригинал на Свидетелство за основно образование</li>
                    <li>Удостоверение за преместване (ако е издадено)</li>

                    <li>Характеристика на ученика</li>
                    <li>Медицински картон/имунизационен паспорт</li>
                    <li>
                        Анкетна карта за родителите – по образец ИЗТЕГЛИ АНКЕТНА
                        КАРТА
                    </li>

                    <li>Три актуални снимки – паспортен формат</li>
                    <li>
                        При записване се подписва договор за обучение с един от
                        родителите, като се внася такса за обучение за I срок
                        или част от нея (в зависимост от договорените условия)
                    </li>
                    <li>
                        Декларация от родител за обработване на лични данни
                        ИЗТЕГЛИ ДЕКЛАРАЦИЯ
                    </li>

                    <li>
                        Декларация от родител за информирано съгласие за
                        видеонаблюдение ИЗТЕГЛИ ДЕКЛАРАЦИЯ
                    </li>
                    <li>
                        Декларация от родител за информирано съгласие за фото и
                        видео-материали ИЗТЕГЛИ ДЕКЛАРАЦИЯ
                    </li>
                </ul>
            </div>
            <div>
                <h4 className="text-xl lg:text-4xl  font-bold">
                    Срокове за подаване на документи:
                </h4>
                <ul className="list-disc px-10 py-4">
                    <li>
                        Безсрочно (до запълване на обявената бройка) – за
                        индивидуален изпит
                    </li>
                </ul>
                <p className="text-lg">
                    Обявяване на резултатите – 3 дни след провеждане на изпитите
                </p>
                <p className="font-bold text-xl">Успех!</p>
            </div>
            </div>
            <Button className="w-full rounded-lg text-xl bg-blue-600 hover:bg-blue-800">Към формуляра</Button>
        </section>
    );
}
