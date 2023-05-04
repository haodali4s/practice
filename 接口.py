import flask, json
from flask import request
import csv
import os
'''
flask： web框架，通过flask提供的装饰器@server.route()将普通函数转换为服务
登录接口，需要传url、username、passwd
'''
from flask import Flask, request, jsonify

app = Flask(__name__)
cartinfo={
    "code": 200,
    "message": "成功",
    "data": [
        {
            "id": 61,
            "userId": "2",
            "skuId": 4,
            "cartPrice": 5999,
            "skuNum": 4,
            "imgUrl": "http://192.168.200.128:8080xxx.jpg",
            "skuName": "Apple iPhone 11 (A2223) ",
            "isChecked": 1,
            "skuPrice": 5999
        },
        {
            "id": 62,
            "userId": "2",
            "skuId": 2,
            "cartPrice": 5499,
            "skuNum": 1,
            "imgUrl": "http://192.168.200.128:8080/yyyy.jpg",
            "skuName": "Apple iPhone 11 (A2223) 64GB 红色",
            "isChecked": 0,
            "skuPrice": 5499
        }
    ],
    "ok": 'true'
}
item={
    "code": 200,
    "message": "成功",
    "data": {
        "valuesSkuJson": "{\"3|5|7\":6,\"3|4|7\":2,\"2|4|7\":3,\"1|5|7\":5,\"1|4|7\":1,\"2|5|7\":4}",
        "price": 5499,
        "categoryView": {
            "id": 61,
            "category1Id": 2,
            "category1Name": "手机",
            "category2Id": 13,
            "category2Name": "手机通讯",
            "category3Id": 61,
            "category3Name": "手机"
        },
        "spuSaleAttrList": [
            {
                "id": 1,
                "spuId": 1,
                "baseSaleAttrId": 1,
                "saleAttrName": "选择颜色",
                "spuSaleAttrValueList": [
                    {
                        "id": 1,
                        "spuId": 1,
                        "baseSaleAttrId": 1,
                        "saleAttrValueName": "黑色",
                        "saleAttrName": "选择颜色",
                        "isChecked": "0"
     },

                ]
            },
            {
                "id": 2,
                "spuId": 1,
                "baseSaleAttrId": 2,
                "saleAttrName": "选择版本",
                "spuSaleAttrValueList": [
                    {
                        "id": 4,
                        "spuId": 1,
                        "baseSaleAttrId": 2,
                        "saleAttrValueName": "64GB",
                        "saleAttrName": "选择版本",
                        "isChecked": "1"
                    },

                ]
            },
            {
                "id": 3,
                "spuId": 1,
                "baseSaleAttrId": 3,
                "saleAttrName": "选择套装",
                "spuSaleAttrValueList": [
                    {
                        "id": 7,
                        "spuId": 1,
                        "baseSaleAttrId": 3,
                        "saleAttrValueName": " 官方标配",
                        "saleAttrName": "选择套装",
                        "isChecked": "1"
                    },
                ]
            }
        ],
        "skuInfo": {
            "id": 2,
            "spuId": 1,
            "price": 5499,
            "skuName": "Apple iPhone 11 (A2223) 64GB 红色 移动联通电信双卡双待",
"skuDesc": "主体\n入网型号\nA2223\n品牌\nApple\n产品名称\niPhone 11\n上市年份\n2019年\n上市月份\n9月\n基本信息\n机身颜色\n红色\n机身长度（mm）\n150.9\n机身重量（g）\n194\n机身材质工艺\n以官网信息为准\n机身宽度（mm）\n75.7\n机身材质分类\n玻璃后盖\n机身厚度（mm）\n8.3\n运营商标志或内容\n无",
            "weight": "0.47",
            "tmId": 1,
            "category3Id": 61,
            "skuDefaultImg": "../images/s1.png",
            "isSale": 1,
            "skuImageList": [
                {
                    "id": 1,
                    "skuId": 1,
                    "imgName": "63e862164165f483.jpg",
                    "imgUrl": "/images/s1.png",
                    "spuImgId": 1,
                    "isDefault": "0"
                },
                {
                    "id": 2,
                    "skuId": 2,
                    "imgName": "63e862164165f484.jpg",
                    "imgUrl": "/images/s2.png",
                    "spuImgId": 2,
                    "isDefault": "0"
                },
                {
                    "id": 3,
                    "skuId": 3,
                    "imgName": "63e862164165f484.jpg",
                    "imgUrl": "/images/s3.png",
                    "spuImgId": 3,
                    "isDefault": "0"
                }

            ],
            "skuAttrValueList": [
                {
                    "id": 6,
                    "attrId": 1,
                    "valueId": 6,
                    "skuId": 2
                },

            ],
            "skuSaleAttrValueList": 'null'
        }
    },
    "ok": 'true'
}
@app.route('/cart/<var1>/<var2>', methods=["POST"])
def cart(var1,var2):
    return cartinfo

@app.route('/item/<var>', methods=["GET"])
def receive(var):

    # params = request.get_json()
    # print(params)
    # track_id = params.get("track_id", 0)
    # time = params.get("timestamp", 0)
    # local_w=params.get("local_w", 0)
    # local_y=params.get("local_y", 0)
    # local_x=params.get("local_x", 0)
    # local_h=params.get("local_h", 0)
    # stitch_y=params.get("stitch_y", 0)
    # stitch_x=params.get("stitch_x", 0)
    # stitch_h=params.get("stitch_h", 0)
    # sticth_w=params.get("sticth_w", 0)
    # file=open(r'E:\STUDY\机场去鸟\data\data.csv','a',newline='')
    # writer=csv.writer(file)
    # writer.writerow((track_id,time,local_w,local_h,local_x,local_y,sticth_w,stitch_h,stitch_x,stitch_y))
    # file.close()

    return item

# @app.before_first_request
# def ini():
#
#     # if 'data.csv' in os.listdir(r'E:\STUDY\机场去鸟\data'):
#     #     os.remove(r'E:\STUDY\机场去鸟\data\data.csv')
#     # file = open(r'E:\STUDY\机场去鸟\data\data.csv', 'w', newline='')
#     # writer = csv.writer(file)
#     # writer.writerow(('track_id', 'time', 'local_w', 'local_h', 'local_x', 'local_y', 'sticth_w', 'stitch_h', 'stitch_x',
#     #                  'stitch_y'))
#     # file.close()
#     if 'data.txt' in os.listdir(r'E:\STUDY\机场去鸟\data'):
#         os.remove(r'E:\STUDY\机场去鸟\data\data.txt')
#     with open(r'E:\STUDY\机场去鸟\data\data.txt', 'w') as f:
#         pass

if __name__ == '__main__':
    # ini()
    app.run(host='0.0.0.0',
            threaded=True,
            debug=False,
            port=8888)

