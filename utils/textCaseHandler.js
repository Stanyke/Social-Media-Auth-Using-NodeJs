//Convert first letter in a word to uppercase
exports.firstLetterUpperCase = (string) =>
{
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
}