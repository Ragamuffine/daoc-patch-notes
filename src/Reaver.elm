module Reaver exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "リーバー 1.121"],
     text "リーバーはフルリスペックされる。",
     secalb "Soulrending (スペック)",
     text "instant DoT spell は除去される。",
     br [] [],
     text "新しい single target DD スペルが追加される。",
     ulist ["Level 12 - Soul Rot - Instant cast - 15s 再使用 - 1000 range - 8 power - 28 spirit damage",
            "Level 24 - Soul Toxin - Instant cast - 15s 再使用 - 1000 range - 16 power - 62 spirit damage",
            "Level 35 - Soul Venom - Instant cast - 15s 再使用 - 1000 range - 21 power - 95 spirit damage",
            "Level 49 - Soul Bane - Instant cast - 15s 再使用 - 1000 range - 30 power - 120 spirit damage"],
     text "lifetap proc は除去される。",
     br [] [],
     text "新しい single target lifetap が追加される。",
     ulist ["Level 3 - Vigor Drain - Instant cast - 20s 再使用 - 1500 range - 3 power - 12 body damage 80% heal",
            "Level 12 - Health Drain - Instant cast - 20s 再使用 - 1500 range - 8 power - 35 body damage 80% heal",
            "Level 21 - Vitality Drain - Instant cast - 20s 再使用 - 1500 range - 13 power - 55 body damage 80% heal",
            "Level 31 - Spirit Drain - Instant cast - 20s 再使用 - 1500 range - 23 power - 81 body damage 80% heal",
            "Level 45 - Soul Drain - Instant cast - 20s 再使用 - 1500 range - 30 power - 109 body damage 80% heal"],
     text "PBAoE damage pulse の半径は 400 に拡大される。",
     text "PBAoE damage pulse は同時に一つだけ使えるようになる。",
     br [] [],
     text "pulsing PBAoE Melee DPS debuff は pulse ではなく単発になる。効果は 25 秒間継続する。再使用 30 秒。",
     br [] [],
     ulist ["レベル 8 の Crippling Curse はレベル 3 Arthritic Curse になる。効果は元のままである。"],
     br [] [],
     text "レベル 41 の instant lifetap spell Life Siphon はレベル 42 になる。",
     br [] [],
     text "新しい PBAoE damage スペルが追加される。",
     ulist ["Level 41 - Circle of Despair - Instant cast - 90s 再使用 - 750 半径 - 15% power - 5% spirit damage"],
     text "新しい PBAoE pet scare スペルが追加される。",
     ulist ["Level 39 - Malefic Horror - Instant cast - 再使用5分 - 350 半径 - 15秒間継続 - 5% power - 敵ペットを追い払う"],
     text "pulsing PBAoE melee ABS debuff は pulsing でなくなる。",
     ulist ["Level 5 - Aura of Foreboding - Instant Cast - 30s 再使用 - 350 半径 - 25秒間継続 - 2 power - 6% ABS debuff",
            "Level 14 - Aura of Destiny - Instant Cast - 30s 再使用 - 350 半径 - 25秒間継続 - 6 power - 9% ABS debuff",
            "Level 25 - Aura of Fate - Instant Cast - 30s 再使用 - 350 半径 - 25秒間継続 - 10 power - 11% ABS debuff",
            "Level 35 - Aura of Destiny - Instant Cast - 30s 再使用 - 350 半径 - 25秒間継続 - 14 power - 15% ABS debuff",
            "Level 47 - Aura of the Inevitable - Instant Cast - 30s 再使用 - 350 半径 - 25秒間継続 - 20 power - 20% ABS debuff"],
     text "acuity debuff は 30% power 回復するようになる。",
     br [] [],
     text "新しい energy resistance debuff が追加される。",
     ulist ["Level 20 - Energy Wither - Instant cast - 5s 再使用 - 1500 range - 15秒間継続 - 10 power - energy resistance 15% debuff",
            "Level 30 - Energy Siphon - Instant cast - 5s 再使用 - 1500 range - 15秒間継続 - 16 power - energy resistance 30% debuff",
            "Level 40 - Energy Wither - Instant cast - 5s 再使用 - 1500 range - 15秒間継続 - 24 power - energy resistance 50% debuff"],
     secalb "Flexible (スペック)",
     ulist ["Level 29 - Taipan - Side - ダメージやや増加",
            "Level 34 - Constrictor - Anytime - ダメージ減少",
            "Level 44 - Cobra - Taipan - ダメージやや増加",
            "Level 50 - Leviathan - Rear - ダメージかなり増加"]]


patch_1_121B : List (Html Message)
patch_1_121B =
    [h2 [] [text "リーバー 1.121B"],
     text "Circle of Despair は以下のように変更される。",
     ulist ["最大ターゲット数は 16 から 8 に変更。",
            "ダメージを 5% から 25 に変更。"],
     text "新しい instant DD shout のダメージタイプが Spirit から Cold に変更される。",
     ulist ["Level 1 - Soul Wench",
            "Level 12 - Soul Rot",
            "Level 18 - Soul Decay",
            "Level 24 - Soul Toxin",
            "Level 35 - Soul Venom",
            "Level 49 - Soul Bane"],
     text "energy resistance debuff が変更される。",
     ulist ["再使用タイマーが5秒から30秒に増加する。",
            "Level 40 debuff Energy Void の効果は50%から40%に低下する。"]]


patch_1_123 : List (Html Message)
patch_1_123 =
    [h2 [] [text "リーバー 1.123"],
     secalb "Soulrending (スペック)",
     text "Circle of Despair の再使用時間は90秒から60秒に短縮される。",
     text "インスタントエナジーデバフは除去された。"]


all : List (Html Message)
all = patch_1_121 ++ patch_1_121B
      ++ patch_1_123
