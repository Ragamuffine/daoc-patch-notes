module Mentalist exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "メンタリスト 1.121"],
     text "メンタリストはフルリスペックされる。",
     sechib "Mana Magic (スペック)",
     text "新しく group power regen が追加される。",
     text "Level 25 DoT Lesser Mind Melt は Level 27 になる。",
     sechib "Mentalism (スペック)",
     text "single target mez は以下のように変更される。",
     ulist ["Level 23 mez の持続時間は 40 秒になる。",
            "Level 31 mez の持続時間は 50 秒になる。",
            "Level 41 mez の持続時間は 60 秒になる。",
            "Level 50 mez Unmake Mind は削除される。"]]
