const sources = [
    {
        "context": {
            "name": "@nuxt/content@v3:urls",
            "description": "Generated from your markdown files.",
            "tips": [
                "No collections found. Make sure your content collections have a `path` field."
            ]
        },
        "fetch": "/__sitemap__/nuxt-content-urls.json",
        "sourceType": "app"
    },
    {
        "context": {
            "name": "nuxt:prerender",
            "description": "Generated at build time when prerendering.",
            "tips": [
                "Can be disabled with `{ excludeAppSources: ['nuxt:prerender'] }`."
            ]
        },
        "urls": [
            {
                "loc": "/"
            },
            {
                "loc": "/blog"
            },
            {
                "loc": "/blog/hello-world",
                "lastmod": "2026-05-20"
            },
            {
                "loc": "/blog/frontend-trends-2026",
                "lastmod": "2026-05-25"
            },
            {
                "loc": "/blog/nuxt-content-guide",
                "lastmod": "2026-05-22"
            },
            {
                "loc": "/about"
            }
        ],
        "sourceType": "app"
    }
];

export { sources };
//# sourceMappingURL=global-sources.mjs.map
