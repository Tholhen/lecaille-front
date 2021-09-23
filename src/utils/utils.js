export const convertDate = (date) => {
    let convertedDate = new Date(date).toLocaleDateString('fr-FR')
    return convertedDate
}