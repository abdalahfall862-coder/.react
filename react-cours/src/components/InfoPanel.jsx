export default function InfoPanel({ title, content, onClose }) {
    return (
        <aside id="info-panel" className="border-b border-gray-200 bg-[#fafaf9]" aria-live="polite">
            <div className="shell py-5">
                <div className="mb-4 flex items-center justify-between gap-4">
                    <h2 className="text-[18px] font-semibold tracking-[-0.5px]">{title}</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full border border-gray-300 px-3 py-2 text-[12px] font-medium text-gray-500 transition duration-200 hover:border-black hover:bg-black hover:text-white active:scale-[0.98]"
                    >
                        Fermer
                    </button>
                </div>
                <div className="info-panel__content">{content}</div>
            </div>
        </aside>
    )
}
