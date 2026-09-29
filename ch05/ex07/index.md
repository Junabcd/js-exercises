# 問題5.7
try文とfinally文にそれぞれreturn文が記載されている関数の実行結果について予想する。  
try文では```return true```、finally文では```return false```と書かれていて、```console.log```に出力した際に、何が出力されるかについてだが、```false```が出力されると予想する。  
教科書のP131に書いてある「return文やcontinue文、break文で処理がtryブロックから移動する場合は、処理が移動する前にfinallyブロックが実行されます。」ということから、```return true```でtryブロックから移動してしまう前にfinallyブロックが実行される。  
finally文では```return false```が書かれているため、関数としては```false```を最終的に返す。  
よって、問題5.7の関数を実行して```console.log```で出力すると、```false```と表示される。  
実際に```index.js```で実行した結果、```false```が出力されたことを確認した。