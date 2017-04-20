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


patch_20170202 : List (Html Message)
patch_20170202 =
    [h2 [] [text "メンタリスト Hot Fix Changes - 2/2/17"],
     sechib "Mana Magic (スペック)",
     text "AoE DoT はボーンダンサー、ネクロマンサーの水準まで増加する。",
     ulist ["Level 23 - Fog of Delirium - 20秒間5秒毎に30ダメージ",
            "Level 29 - Hallucinatory Winds - 20秒間4秒毎60ダメージ",
            "Level 36 - Torrent of Dementia - 20秒間4秒毎88ダメージ",
            "Level 46 - Storms of Insanity - 20秒間2.5秒毎131ダメージ",
            "他の呪文は無変更である。"]]


patch_1_122C_HotFixNotes : List (Html Message)
patch_1_122C_HotFixNotes =
    [h2 [] [text "メンタリスト The Ghost Keep RvR Event and Hot Fix Notes"],
     sechib "Mana Magic (スペック)",
     text "Level 46 Storm of Insanity の tick ごとのダメージは 131 から 121 に減少する。"]


all : List (Html Message)
all = patch_1_121 ++ patch_20170202
      ++ patch_1_122C_HotFixNotes
