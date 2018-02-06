module.exports = function (target, data) {
    Object.assign(target, require(`../data/${ data }.js`));
}