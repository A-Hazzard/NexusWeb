export default function slugify(text: string, options?: { lower?: boolean; strict?: boolean }): string {
    const { lower = true, strict = false } = options || {};

    let slug = text.toString().trim();

    if (lower) {
        slug = slug.toLowerCase();
    }

    // Remove accents
    slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Replace spaces with -
    slug = slug.replace(/\s+/g, "-");

    if (strict) {
        // Remove special characters
        slug = slug.replace(/[^\w\-]+/g, "");
        // Replace multiple - with single -
        slug = slug.replace(/\-\-+/g, "-");
        // Trim - from start and end
        slug = slug.replace(/^-+/, "").replace(/-+$/, "");
    }

    return slug;
}
