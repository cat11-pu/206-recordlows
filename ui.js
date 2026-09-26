// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  parts.log.textContent = "数值 " + (spec.values || []).length + " 个，点按钮数新低。";

  function draw() {
    let view = null;
    try {
      view = render(spec);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    (spec.values || []).forEach(function (value, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = "第 " + (spot + 1) + " 个 " + value;
      row.appendChild(head);
      const mark = document.createElement("span");
      mark.className = "chip" + (view.lows.indexOf(spot) !== -1 ? " ok" : "");
      mark.textContent = view.lows.indexOf(spot) !== -1 ? "刷新新低" : "没刷新";
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "新低 " + view.count + " 次，最低 " + view.lowest + "（第 " + (view.lowest_at + 1) + " 个）";
    parts.log.textContent = "首点是否算新低 " + view.first_counted;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "数新低";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "末尾加一个更小的值";
  addButton.addEventListener("click", function () {
    const view = render(spec);
    spec.values = (spec.values || []).concat([view.lowest - 3]);
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "去掉最后一个";
  dropButton.addEventListener("click", function () {
    spec.values = (spec.values || []).slice(0, -1);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "试一个值";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "number";
  box.value = "-5";
  box.addEventListener("input", function () {
    const parsed = Number(box.value);
    if (!Number.isNaN(parsed)) {
      try {
        const view = render(Object.assign({}, spec, { values: (spec.values || []).concat([parsed]) }));
        parts.out.textContent = "加入 " + parsed + " 后新低 " + view.count + " 次";
      } catch (error) {
        parts.out.textContent = String(error && error.code ? error.code : String(error));
      }
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看新低次数";
  readButton.addEventListener("click", function () {
    const view = render(spec);
    parts.out.textContent = "新低 " + view.count + " 次，最低 " + view.lowest;
  });
  parts.controls.appendChild(readButton);

  draw();
}
