export default function(prefix, frameData) {
  // The return value;
  var out = [];
  for (var i = 0; i < frameData.total; i++) {
    var name = frameData.getFrame(i).name;
    if (name.indexOf(prefix) == 0){
      out.push(name);
    }
  }
  return out;
}
