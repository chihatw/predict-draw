# ページを開いているIPを取得
- ページを開いた時は
  - useEffect で ip アドレスを firestore に登録
  - fetch は Braveでは使用不可（ローカルだけ？）
- ページを閉じた時は
  - navigator.sendBeacon を使って cloud functions 経由で firestore から削除
  - cloud functions 使用のために firebase を`従量課金`にしている
 - predict-draw-master で onSnapshot で取得

# predict-draw-master から 表示をコントロールする
- LiSanPageState
  - 'predic'|'draw'|''
- KouSanPageState
- - 'predic'|'draw'|''

