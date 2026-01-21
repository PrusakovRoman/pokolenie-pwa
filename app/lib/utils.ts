interface PluralForms {
    one: string
    few: string
    many: string
}

/**
 * Универсальная функция для склонения слов по числам
 * @param count - количество
 * @param forms - формы слова {one, few, many}
 * @returns правильная форма слова
 */
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