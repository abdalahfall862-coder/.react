export default function Hero({ onDiscover }) {
    return (
        <section className="shell py-8 sm:py-10">
            <div className="flex min-h-[520px] overflow-hidden rounded-[28px] border border-stone-200 shadow-sm max-md:flex-col">

                <div className="flex w-1/2 flex-col justify-center px-8 py-14 sm:px-12 md:px-16 max-md:w-full">
                    <p className="mb-5 text-[11px] font-semibold uppercase tracking-[2px] text-gray-500">
                        Nouvelle collection
                    </p>
                    <h1 className="mb-6 max-w-[560px] text-[clamp(38px,4vw,62px)] font-semibold leading-[0.98] tracking-[-0.045em]">
                        Découvrez notre nouvelle collection
                    </h1>
                    <p className="mb-8 max-w-[440px] text-[14px] leading-7 text-gray-500">
                        Découvrez les dernières nouveautés disponibles dans notre boutique.
                    </p>
                    <button
                        type="button"
                        onClick={onDiscover}
                        className="w-fit rounded-full bg-black px-7 py-3.5 text-[12px] font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg active:scale-[0.98]"
                    >
                        Découvrir
                    </button>
                </div>

                <div
                    className="min-h-[520px] w-1/2 max-md:min-h-[300px] max-md:w-full"
                    aria-hidden="true"
                />

            </div>
        </section>
    )
}
