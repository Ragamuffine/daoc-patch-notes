module Bard exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "バード 1.121"],
     text "バードはフルリスペックされる。",
     sechib "Regrowth (基本)",
     text "Cure Poison と Cure Disease のキャスト時間は2.4秒に短縮される。",
     sechib "Music (スペック)",
     text "新しい speed buff を追加",
     ulist ["Crescendo, realm target, instant-cast, 7秒間継続, 130% speed buff, 34 Music. ターゲットは root, snare, mezz の影響を受ける。speedwarp で速度が落ちる。だが戦闘になっても speed buff は維持される。",
            "Great Crescendo, realm target, instant-cast, 9秒間継続, 160% speed buff, 44 music. ターゲットは root, snare, mezz の影響を受ける。speedwarp で速度が落ちる。だが戦闘になっても speed buff は維持される。"],
     sechib "Nurture (スペック)",
     text "resist song は新しい single target resistance buff に置き換えられる。このレジストは CL バフ、Druid/Warden のレジストバフとスタックしない。",
     ulist ["Level 27 - Hymn of Soul Guarding - 4.0s cast - 1500 range - 持続時間20分 - 5% power - すべての魔法レジストを8%増加",
            "Level 46 - Hymn of Soul Protection - 4.0s cast - 1500 range - 持続時間20分 - 5% power - すべての魔法レジストを12%増加"]]


patch_1_122B : List (Html Message)
patch_1_122B =
    [h2 [] [text "バード 1.122B"],
     sechib "Nurture (基本)",
     text "Level 45 - Superior Skin of the Redwood - AF の値は 55 から 150 に増加する。"]


patch_1_123 : List (Html Message)
patch_1_123 =
    [h2 [] [text "バード 1.123"],
     sechib "Nurture (スペック)",
     text "すべてのスピード呪文は基本ラインに移される。",
     sechib "Music (基本)",
     text "レベル23単体ルート Melody of Tangling はレベル20になる。レベル43単体メツ Fascinating Hymn はレベル44になる。すべてのスピードソングは以下のレベルになる。なお威力は変わらない。",
     ulist ["Level 3 - Clear Path",
            "Level 13 - Clear Trail",
            "Level 23 - Clear Road",
            "Level 33 - Clear Field",
            "Level 43 - Clear Horizon"],
     text "すべての水バフはベースラインになる。"]


all : List (Html Message)
all = patch_1_121 ++ patch_1_122B
      ++ patch_1_123
