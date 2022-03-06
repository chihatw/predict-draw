# ページを開いているIPを取得
- ページを開いた時は
  - useEffect で ip アドレスを firestore に登録
  - fetch は Braveでは使用不可（ローカルだけ？）
- ページを閉じた時は
  - navigator.sendBeacon を使って cloud functions 経由で firestore から削除
  - cloud functions 使用のために firebase を`従量課金`にしている

# TODO perpetuateIpInfo, removeIpInfo を上に移動
 - predict-draw-master で onSnapshot で取得

