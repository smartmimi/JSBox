/*
在tlist里填写监控的名称及日期，参照脚本内格式
在桌面添加JSBox小组件，长按小组件，选择此脚本j即可
脚本自动判断未来的日期，按照由近至远的顺序排列
注意:
1、tlist内序号、日期需要按增序排列
2、选择中型小组件
*/
var tlist = {
  1: ["春节", "2021-02-12"],
  2: ["元宵", "2021-02-26"],
  3: ["清明", "2021-04-04"],
  4: ["劳动", "2021-05-01"],
  5: ["端午", "2021-06-12"],
  6: ["测试长度", "2021-06-30"],
  7: ["中秋", "2021-09-19"],
  8: ["国庆", "2021-10-01"],
  9: ["元旦", "2022-01-01"],
  10: ["春节", "2022-02-01"],
  11: ["元宵", "2022-02-15"],
  12: ["清明", "2022-04-05"],
  13: ["劳动", "2022-05-01"],
  14: ["端午", "2022-06-03"],
  15: ["中秋", "2022-09-10"]
};

let tnow = new Date();
let tnowf =
  tnow.getFullYear() + "-" + (tnow.getMonth() + 1) + "-" + tnow.getDate();
/* 计算2个日期相差的天数，不包含今天，如：2016-12-13到2016-12-15，相差2天
 * @param startDateString
 * @param endDateString
 * @returns
 */
function dateDiff(startDateString, endDateString) {
  var separator = "-"; //日期分隔符
  var startDates = startDateString.split(separator);
  var endDates = endDateString.split(separator);
  var startDate = new Date(startDates[0], startDates[1] - 1, startDates[2]);
  var endDate = new Date(endDates[0], endDates[1] - 1, endDates[2]);
  return parseInt(
    //    Math.abs(endDate - startDate) / 1000 / 60 / 60 / 24
    //  ).toString(); //把相差的毫秒数转换为天数
    (endDate - startDate) / 1000 / 60 / 60 / 24
  ).toString(); //把相差的毫秒数转换为天数
}
//var tnum = dateDiff(tnowf, tlist[1][1]);
function tnumcount(num) {
  let dnum = num;
  return dateDiff(tnowf, tlist[dnum][1]);
}
/*
获取最接近的日期
*/
function now() {
  for (var i = 1; i <= Object.getOwnPropertyNames(tlist).length; i++) {
    if (Number(dateDiff(tnowf, tlist[i.toString()][1])) >= 0) {
      console.log("最近的日期是:" + tlist[i.toString()][0]);
      console.log("列表长度:" + Object.getOwnPropertyNames(tlist).length);
      console.log(
        "时间差距:" + Number(dateDiff(tnowf, tlist[i.toString()][1]))
      );
      return i;
    }
  }
}
//如果是0天，发送emoji;
let nowlist = now();

function today(day) {
  let daythis = day;
  if (daythis == "0") {
    datenotice();
    return "🎉";
  } else {
    return daythis;
  }
}
//提醒日当天发送通知
function datenotice() {
  if ($cache.get("pushed") != tlist[nowlist][1] && tnow.getHours() >= 6) {
    $cache.set("pushed", tlist[nowlist][1]);
    $push.schedule({
      title: "时间卡提醒",
      body: "今天是" + tlist[nowlist][1] + "日 " + tlist[nowlist][0] + " 🎉"
    });
  } else if ($cache.get("pushed") == tlist[nowlist][1]) {
    console.log("当日已通知");
  }
}
$widget.setTimeline({
  render: ctx => {
    const width = $widget.displaySize.width;
//console.log(width);
//设置小组件右侧显示的各部分的宽度
let tnamewidth = width/2; //名称宽度
let tcountwidth = width/4; //倒数日宽度
let tdatewidth = width/2; //日期宽度

    return {
      type: "hstack",
      props: {
        //background: $color("white"),
        alignment: $widget.verticalAlignment.right,
        spacing: 15,
        frame: {
          maxWidth: Infinity,
          maxHeight: Infinity
        },
        padding: 18
      },
      views: [
        {
          type: "vstack",
          props: {
            alignment: $widget.horizontalAlignment.center,
            spacing: 10
          },
          views: [
            {
              type: "text",
              props: {
                text: today(tnumcount(nowlist)),
                font: $font(40),
                bold: true,
                color: $color("red"),
                frame: {
                  height: 25,
                  width: 80
                }
              }
            },
            {
              type: "color",
              props: {
                frame: {
                  width: 35,
                  height: 5
                },
                color: $color("red"),
                cornerRadius: 3
              }
            },
            {
              type: "text",
              props: {
                text: tlist[nowlist][0],
                font: $font(20),
                jbold: true,
                color: $color("red"),
                frame: {
                  height: 25
                }
              }
            }
          ]
        },
        {
          type: "divider",
          props: {
            background: $color("systemGray2")
          }
        },
        //名称
        {
          type: "vstack",
          props: {
            alignment: "center",
            spacing: 10
          },
          views: [
            {
              type: "text",
              props: {
                text: tlist[Number(nowlist) + Number(1)][0],
                font: $font(15),
                color: $color("tintColor"),
                bold: true,
                frame: {
                  height: 25,
                  width: tnamewidth
                }
              }
            },
            {
              type: "text",
              props: {
                text: tlist[Number(nowlist) + Number(2)][0],
                font: $font(15),
                color: $color("tintColor"),
                bold: true,
                frame: {
                  height: 25,
                  width: tnamewidth
                }
              }
            },
            {
              type: "text",
              props: {
                text: tlist[Number(nowlist) + Number(3)][0],
                font: $font(15),
                color: $color("tintColor"),
                bold: true,
                frame: {
                  height: 25,
                  width: tnamewidth
                }
              }
            },
            {
              type: "text",
              props: {
                text: tlist[Number(nowlist) + Number(4)][0],
                font: $font(15),
                color: $color("tintColor"),
                bold: true,
                frame: {
                  height: 25,
                  width: tnamewidth
                }
              }
            }
          ]
        },
        //倒数日
        {
          type: "vstack",
          props: {
            alignment: "center",
            spacing: 10
          },
          views: [
            {
              type: "text",
              props: {
                text: tnumcount(Number(nowlist) + Number(1)),
                font: $font(20),
                color: $color("tintColor"),
                bold: true,
                frame: {
                  height: 25,
                  width: tcountwidth
                }
              }
            },
            {
              type: "text",
              props: {
                text: tnumcount(Number(nowlist) + Number(2)),
                font: $font(20),
                color: $color("tintColor"),
                bold: true,
                frame: {
                  height: 25,
                  width: tcountwidth
                }
              }
            },
            {
              type: "text",
              props: {
                text: tnumcount(Number(nowlist) + Number(3)),
                font: $font(20),
                color: $color("tintColor"),
                bold: true,
                frame: {
                  height: 25,
                  width: tcountwidth
                }
              }
            },
            {
              type: "text",
              props: {
                text: tnumcount(Number(nowlist) + Number(4)),
                font: $font(20),
                color: $color("tintColor"),
                bold: true,
                frame: {
                  height: 25,
                  width: tcountwidth
                }
              }
            }
          ]
        },
//详细日期
        {
          type: "vstack",
          props: {
            alignment: "center",
            spacing: 10
          },
          views: [
            {
              type: "text",
              props: {
                text: tlist[Number(nowlist) + Number(1)][1],
                font: $font(10),
                color: $color("tintColor"),
                bold: true,
                frame: {
                  height: 25,
                  width: tdatewidth
                }
              }
            },
            {
              type: "text",
              props: {
                text: tlist[Number(nowlist) + Number(2)][1],
                font: $font(10),
                color: $color("tintColor"),
                bold: true,
                frame: {
                  height: 25,
                  width: tdatewidth
                }
              }
            },
            {
              type: "text",
              props: {
                text: tlist[Number(nowlist) + Number(3)][1],
                font: $font(10),
                color: $color("tintColor"),
                bold: true,
                frame: {
                  height: 25,
                  width: tdatewidth
                }
              }
            },
            {
              type: "text",
              props: {
                text: tlist[Number(nowlist) + Number(4)][1],
                font: $font(10),
                color: $color("tintColor"),
                bold: true,
                frame: {
                  height: 25,
                  width: tdatewidth
                }
              }
            }
          ]
        }
      ]
    };
  }
});
