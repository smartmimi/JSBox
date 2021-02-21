/*
在tlist里填写监控的名称及日期，参照脚本内格式
在桌面添加JSBox小组件，长按小组件，选择此脚本j即可
脚本自动判断未来的日期，按照由近至远的顺序排列
注意:
1、tlist内序号、日期需要按增序排列
2、选择中型小组件
如果某些区域显示不全，可在28行调节个区域宽度
*/
var tlist = {
  1: ["春节", "2021-02-11"],
  2: ["元宵", "2021-02-26"],
  3: ["清明", "2021-04-04"],
  4: ["劳动", "2021-05-01"],
  5: ["端午", "2021-06-12"],
  6: ["中秋", "2021-09-19"],
  7: ["国庆", "2021-10-01"],
  8: ["元旦", "2022-01-01"],
  9: ["春节", "2022-02-01"],
  10: ["元宵", "2022-02-15"],
  11: ["清明", "2022-04-05"],
  12: ["劳动", "2022-05-01"],
  13: ["端午", "2022-06-03"],
  14: ["中秋", "2022-09-10"]
};
//设置小组件右侧显示的各部分的宽度
let tnamewidth = 40; //名称宽度
let tcountwidth = 50; //倒数日宽度
let tdatewidth = 70; //日期宽度

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
  for (var i = 1; i++; i <= tlist.length) {
    if (dateDiff(tnowf, tlist[i][1]) >= 0) {
      return i;
    }
  }
}
let nowlist = now();
$widget.setTimeline({
  render: ctx => {
    return {
      type: "hstack",
      props: {
        background: $color("white"),
        alignment: $widget.horizontalAlignment.right,
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
            alignment: $widget.verticalAlignment.right,
            spacing: 10
          },
          views: [
            {
              type: "text",
              props: {
                text: tnumcount(nowlist),
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
                  width: 30,
                  height: 5
                },
                color: "red",
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
            //            {
            //              type: "color",
            //              props: {
            //                frame: {
            //                  width: 5,
            //                  height: 5
            //                },
            //                color: "red",
            //                cornerRadius: 3
            //              }
            //            }
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
