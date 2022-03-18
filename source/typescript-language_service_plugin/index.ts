console.log('---');

// function init(modules: { typescript: typeof import("typescript/lib/tsserverlibrary") }) {
//     const ts = modules.typescript;
//     /* More to come here */
// }
// export = init;


function init(modules: { typescript: typeof import("typescript/lib/tsserverlibrary") }) {
    const ts = modules.typescript;

    function create(info: ts.server.PluginCreateInfo) {
        // Set up decorator object
        const proxy: ts.LanguageService = Object.create(null);

        for (let k of Object.keys(info.languageService) as Array<keyof ts.LanguageService>) {
            const x = info.languageService[k]!;
            // @ts-expect-error - JS runtime trickery which is tricky to type tersely
            proxy[k] = (...args: Array<{}>) => x.apply(info.languageService, args);
        }

        return proxy;
    }

    return { create };
}

export = init;