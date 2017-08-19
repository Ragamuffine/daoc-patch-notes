module Valkyrie exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "ヴァルキリー 1.121"],
     text "ヴァルキリーはフルリスペックされる。",
     secmid "Mending (基本)",
     text "Cure Poison と Cure Disease のキャスト時間は2.4秒に短縮される。",
     secmid "Odin's Will (スペック)",
     text "新しい body resistance debuff が追加される。",
     ulist ["Level 20 - Boost Spellcaster - Instant cast - 5s 再使用 - 1500 range - 15秒間継続 - 10 power - body resistance 15%低下",
            "Level 30 - Support Spellcaster - Instant cast - 5s 再使用 - 1500 range - 15秒間継続 - 16 power - body resistance 30%低下",
            "Level 40 - Bolster Spellcaster - Instant cast - 5s 再使用 - 1500 range - 15秒間継続 - 24 power - body resistance 50%低下"]]


patch_1_121B : List (Html Message)
patch_1_121B =
    [h2 [] [text "ヴァルキリー 1.121B"],
     text "body resistance debuff は以下のように修正される。",
     ulist ["再使用タイマーは5秒から30秒に延長する。",
            "Level 40 debuff Bolster Spellcaster の効果は50%から40%に低下する。"]]


patch_1_123 : List (Html Message)
patch_1_123 =
    [h2 [] [text "ヴァルキリー 1.123"],
     text "ヴァルキリーはフルリスペックされる。",
     secmid "Sword (スペック)",
     text "レベル29スタイル Rush のダメージがやや増加する。",
     ulist ["Level 50 - Ragnarok - Back - Medium Endurance - High Damage - Medium Hit Bonus - Medium Defensive Penalty - 75 energy damage"],
     secmid "Odin's Will (スペック)",
     text "グループ魔法吸収 ablative は以下のように調整される。詠唱者に対する効果は半分になる。",
     ulist ["Level 13 - Odin's Hope - Instant Cast - 1500 range - 30秒継続 - 再使用30秒 - 10% power - 魔法ダメージ 100 吸収",
            "Level 23 - Odin's Faith - Instant Cast - 1500 range - 30秒継続 - 再使用30秒 - 10% power - 魔法ダメージ 200 吸収",
            "Level 33 - Odin's Virtue - Instant Cast - 1500 range - 30秒継続 - 再使用30秒 - 10% power - 魔法ダメージ 350 吸収",
            "Level 43 - Odin's Temperance - Instant Cast - 1500 range - 30秒継続 - 再使用30秒 - 10% power - 魔法ダメージ 600 吸収"],
     text "インスタント CAoE DD スペルの再使用時間は25秒に短縮される。",
     text "インスタント body デバフは削除された。"]


all : List (Html Message)
all = patch_1_121 ++ patch_1_121B
      ++ patch_1_123
