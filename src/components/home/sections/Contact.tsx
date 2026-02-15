import { Link } from "@/i18n/navigation";

export default function ContactSection() {
    return (
        <section className="h-fit w-full">
            {/* <h3 className="w-full p-3 text-center text-4xl underline  decoration-4 sm:text-left lg:text-6xl">
                Свържете се с нас
            </h3> */}
            <div className="flex h-fit w-full justify-center bg-gray-900">
                <Link
                    href="https://maps.app.goo.gl/PCDdCJbaF5vfMTY98"
                    className="relative h-fit w-fit before:absolute before:top-0 before:right-0 before:h-full before:w-full before:bg-[linear-gradient(90deg,transparent_0_90%,#111827_100%)] before:content-[''] after:absolute after:top-0 after:left-0 after:h-full after:w-full after:bg-[linear-gradient(270deg,transparent_0_90%,#111827_100%)] after:content-['']"
                >
                    <img
                        src={"/home/map.png"}
                        className="h-auto w-full border-y-4 border-yellow-500"
                    />
                </Link>
            </div>
            {/* <div className="flex w-full flex-col gap-2 bg-white sm:flex-row h-full">
           
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2908.3079355977425!2d27.916657411454345!3d43.20303018131007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a453f471687209%3A0xf1a81062daaa8d89!2z0KfQsNGB0YLQvdCwINGC0YrRgNCz0L7QstGB0LrQsCDQs9C40LzQvdCw0LfQuNGP!5e0!3m2!1sbg!2sbg!4v1703864908152!5m2!1sbg!2sbg"
            
            <ContactForm />
        </div> */}
        </section>
    );
}
