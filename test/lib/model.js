exports.create = function () {
  return new Model();
}

function Model() {}

Model.prototype.get = function (resource, callback) {
  callback(null, 123);
};
