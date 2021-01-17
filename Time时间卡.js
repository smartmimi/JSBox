/*
在tlist里填写监控的名称及日期，参照如下格式
在桌面添加JSBox小组件，长按小组件，选择此脚本，填写监控名称作为参数.
*/
var tlist = {
  春节: "2021-02-11",
  元宵: "2021-02-26",
  清明: "2021-04-04",
  劳动: "2021-05-01"
};
var inp = $widget.inputValue;
var tnow = new Date();
var tnowf =
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
    Math.abs(endDate - startDate) / 1000 / 60 / 60 / 24
  ).toString(); //把相差的毫秒数转换为天数
}
var tnum = dateDiff(tnowf, tlist[inp]);
$widget.setTimeline({
  render: ctx => {
    return {
      type: "vstack",
      props: {
        background: $color("white"),
        alignment: $widget.horizontalAlignment.center,
        spacing: 15,
        frame: {
          maxWidth: Infinity,
          maxHeight: Infinity
        },
        padding: 18
      },
      views: [
        {
          type: "hstack",
          props: {
            alignment: $widget.verticalAlignment.center,
            spacing: 10
          },
          views: [
            {
              type: "color",
              props: {
                frame: {
                  width: 5,
                  height: 5
                },
                color: "red",
                cornerRadius: 3
              }
            },
            {
              type: "text",
              props: {
                text: tnum,
                font: $font(50),
                bold: true,
                color: $color("red"),
                frame: {
                  height: 25
                }
              }
            },
            {
              type: "color",
              props: {
                frame: {
                  width: 5,
                  height: 5
                },
                color: "red",
                cornerRadius: 3
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
        {
          type: "hstack",
          props: {
            alignment: "center",
            spacing: 10
          },
          views: [
            //            {
            //              type: "color",
            //              props: {
            //                color: "green",
            //                frame: {
            //                  width: 5,
            //                  height: 5
            //                },
            //                cornerRadius: 3
            //              }
            //            },
            {
              type: "text",
              props: {
                text: inp,
                font: $font(24),
                color: $color("tintColor"),
                bold: true,
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
            //                color: "green",
            //                cornerRadius: 3
            //              }
            //            },
          ]
        },
        {
          type: "text",
          props: {
            text: tlist[inp],
            frame: {
              height: 16
            },
            font: $font(13),
            color: $color("systemGray2")
          }
        }
      ]
    };
  }
});