interface PluralForms {
    one: string
    few: string
    many: string
}

function pluralize(count: number, forms: PluralForms): string {
    if (count === 0) return forms.many

    const lastDigit = count % 10
    const lastTwoDigits = count % 100

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return forms.many
    }

    if (lastDigit === 1) {
        return forms.one
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
        return forms.few
    }

    return forms.many
}

export const materialsWord = (count: number) =>
    pluralize(count, {
        one: 'материал',
        few: 'материала',
        many: 'материалов'
    })

export function generatePagination(totalPages: number, currentPage: number) {
    const pages: (number | string)[] = []

    if (totalPages <= 4) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i)
        }
    } else {
        if (currentPage <= 2) {
            pages.push(1, 2)
            pages.push('...')
            pages.push(totalPages)
        } else if (currentPage >= totalPages - 1) {
            pages.push(1)
            pages.push('...')
            pages.push(totalPages - 1, totalPages)
        } else {
            pages.push(1)
            pages.push('...')
            pages.push(currentPage)
            pages.push('...')
            pages.push(totalPages)
        }
    }
    return pages
}