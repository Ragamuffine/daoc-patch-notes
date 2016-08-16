module Minstrel exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "ミンストレル 1.121"],
     text "ミンストレルはフルリスペックされる。",
     secalb "Instruments (スペック)",
     text "新しい speed buff を追加",
     ulist ["Crescendo, realm target, instant-cast, 7秒間継続, 130% speed buff, 34 Music. ターゲットは root, snare, mezz の影響を受ける。speedwarp で速度が落ちる。だが戦闘になっても speed buff は維持される。",
            "Great Crescendo, realm target, instant-cast, 9秒間継続, 160% speed buff, 44 music. ターゲットは root, snare, mezz の影響を受ける。speedwarp で速度が落ちる。だが戦闘になっても speed buff は維持される。"],
     text "Single target flute mez の効果は33%短縮される。",
     ulist ["Level 50: 29 から 20 秒へ",
           "Level 36: 26 から 18 秒へ",
           "Level 24: 20 から 14 秒へ",
           "Level 18: 17 から 12 秒へ",
           "Level 9 : 12 から 8 秒へ"],
     text "ただし flute mez の実際の効果は倍になる。例えば level 50 での20秒 mez は実際には 40秒になる。"]
