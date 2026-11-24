function Make_file() {
  let Name = document.getElementById("name").value;
  let Txt = document.getElementById("txt").value;
  let Extension = document.getElementById("extension").value;

  let Stream = Txt;
  SaveToFile(Name + "." + Extension, Stream);
}

function Uuid() {
  let chars = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("");
  for (let i = 0, len = chars.length; i < len; i++) {
    switch (chars[i]) {
      case "x":
        chars[i] = Math.floor(Math.random() * 16).toString(16);
        break;
      case "y":
        chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
        break;
    }
  }
  return chars.join("");
}

function copy() {
  let txt = document.getElementById("out");
  txt.select();
  document.execCommand("Copy");
  alert("コピーしました");
}

function Manifest() {
  let name = document.getElementById("name").value;
  let description = document.getElementById("description").value;
  let type = document.getElementById("type").value;
  let fv = document.getElementById("fv").value;
  let v1 = document.getElementById("v-1").value;
  let v2 = document.getElementById("v-2").value;
  let v3 = document.getElementById("v-3").value;
  let mv1 = document.getElementById("mv-1").value;
  let mv2 = document.getElementById("mv-2").value;
  let mv3 = document.getElementById("mv-3").value;

  let uuid_1 = Uuid();
  let uuid_2 = Uuid();

  switch (type) {
    case "r":
      type = "resources";
      break;

    case "b":
      type = "data";
      break;

    case "w":
      type = "world_template";
      break;

    default:
      alert("エラー発生...\n時間を空けてお試しください");
      break;
  }

  if (name == "null") {
    alert(
      "error :\nPack nameが空白になっています\nPack nameを入力してください"
    );
    return false;
  }
  if (description == "null") {
    description = "undefine";
  }
  if (fv == "null") {
    fv = 2;
  } else {
    fv = parseFloat(fv);
  }
  if (v1 == "null") {
    v1 = 1;
  } else {
    v1 = parseFloat(v1);
  }
  if (v2 == "null") {
    v2 = 0;
  } else {
    v2 = parseFloat(v2);
  }
  if (v3 == "null") {
    v3 = 0;
  } else {
    v3 = parseFloat(v3);
  }
  if (mv1 == "null") {
    mv1 = 1;
  } else {
    mv1 = parseFloat(mv1);
  }
  if (mv2 == "null") {
    mv2 = 16;
  } else {
    mv2 = parseFloat(mv2);
  }
  if (mv3 == "null") {
    mv3 = 0;
  } else {
    mv3 = parseFloat(mv3);
  }

  let datajson = {
    format_version: fv,
    header: {
      description: description,
      name: name,
      uuid: uuid_1,
      version: [v1, v2, v3],
      min_engine_version: [mv1, mv2, mv3],
    },
    modules: [
      {
        description: description,
        type: type,
        uuid: uuid_2,
        version: [v1, v2, v3],
      },
    ],
  };

  let encodejson = JSON.stringify(datajson, null, 2);
  let Stream = encodejson;
  SaveToFile("manifest.json", Stream);
}

function encode() {
  document.unicode.reset();

  let Txt = document.getElementById("txt").value;

  const encode = escape(Txt).replace(/%/g, "\\");
  let Unicode = document.getElementById("unicode");
  Unicode.innerHTML = encode;
}

function decode() {
  document.txt.reset();

  let Unicode = document.getElementById("unicode").value;

  const encode = unescape(Unicode.replace(/\\/g, "%"));
  let Text = document.getElementById("txt");
  Text.innerHTML = encode;
}

function pack_meta() {
  let Format = document.getElementById("format").value;
  let Description = document.getElementById("description").value;

  if (Format == "") {
    alert(
      "error :\nPack_Formatが空白になっています\nPack_Formatを入力してください"
    );
    return false;
  } else {
    Format = parseFloat(Format);
  }

  if (Description == "null") {
    Description = "undefine";
  } else {
  }

  let Datajson = {
    pack: {
      pack_format: Format,
      description: Description,
    },
  };

  let Encodejson = JSON.stringify(Datajson, null, 2);
  let Stream = Encodejson;
  SaveToFile("pack.mcmeta", Stream);
}

function fJson() {
  let out = document.getElementById("out");
  let Bjson = document.getElementById("bjson").value;
  let json = JSON.parse(Bjson);
  let Ajson = JSON.stringify(json, null, 2);

  out.innerHTML = Ajson;
}
function dljson() {
  let name = document.getElementById("name").value;
  let ext = document.getElementById("extension").value;
  let out = document.getElementById("out").value;

  if ((name = "null")) {
    name = "undefined";
  }

  switch (ext) {
    case "j":
      ext = ".json";
      break;

    case "jc":
      ext = ".jsonc";
      break;

    case "t":
      ext = ".txt";
      break;
  }

  let Stream = out;
  SaveToFile(name + ext, Stream);
}
window.addEventListener("load", () => {
  let f = document.getElementById("json");
  f.addEventListener("change", (evt) => {
    let input = evt.target;
    if (input.files.length == 0) {
      console.log("No file selected");
      return;
    }
    let file = input.files[0];
    let reader = new FileReader();
    reader.onload = () => {
      let out = document.getElementById("out");
      let json = JSON.parse(reader.result);
      let Ajson = JSON.stringify(json, null, 2);

      out.innerHTML = Ajson;
    };

    reader.readAsText(file);
  });
});
