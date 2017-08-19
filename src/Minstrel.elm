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


patch_1_122B : List (Html Message)
patch_1_122B =
    [h2 [] [text "ミンストレル 1.122B"],
     text "ミンストレルはフルリスペックされる。",
     secalb "Instruments (スペック)",
     text "新しくグループシージダメージ低減オーラが追加される。",
     ulist ["Level 6 - Ballad of Albion - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - シージダメージ 10% 低下",
                "Level 16 - Chant of Albion - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - シージダメージ 20% 低下",
                "Level 26 - Chorus of Albion - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - シージダメージ 30% 低下",
                "Level 36 - Song of Albion - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - シージダメージ 40% 低下",
                "Level 46 - Anthem of Albion - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - シージダメージ 50% 低下 - 同時に以下の効果を発動 - 500 range - 持続時間8秒 - 7秒ごと - 35% siege haste"],
     text "新しく siege へのグループダメージボーナスが追加される。",
     ulist ["Level 40 - Siegebreaker - Instant cast - 2000 range - 半径150 - 持続時間15秒 - 再使用90秒 - ターゲットの物理攻撃に 20 essence damage が追加される。ターゲットが扱う siege 武器のダメージにも同様に追加される。"]]


patch_1_122B_HotFix2 : List (Html Message)
patch_1_122B_HotFix2 =
    [h2 [] [text "ミンストレル 1.122B Hot Fix #2"],
     text "シージチャントは正しくグループメンバーに効果を及ぼすようになる。"]


patch_1_123 : List (Html Message)
patch_1_123 =
    [h2 [] [text "ミンストレル 1.123"],
     text "ミンストレルはフルリスペックされる。",
     secalb "Instruments (スペック)",
     text "すべてのスピードソングはベースに移される。",
     ulist ["Level 3 - Motivational Chant",
            "Level 13 - Motivational Song",
            "Level 23 - Motivational Hymn",
            "Level 33 - Motivational Strains",
            "Level 43 - Motivational Anthem"],
     text "水バフスペルはベースに移される。",
     br [] [],
     text "新しい celerity ソングが追加される。この celerity の効果はパラディンの celerity と共存可能だがペットに対しては無効である。また効果時間が終わった後に自動的に更新されない。",
     ulist ["Level 16 - Song of Inspiring Fervor - 3.5s cast - 2000 range - 15秒継続 - グループの攻撃速度を 24% 増加させる",
            "Level 26 - Song of Rallying Fervor - 3.5s cast - 2000 range - 15秒継続 - グループの攻撃速度を 28% 増加させる",
            "Level 36 - Song of Awakening Fervor - 3.5s cast - 2000 range - 15秒継続 - グループの攻撃速度を 31% 増加させる",
            "Level 46 - Song of Everlasting Fervor - 3.5s cast - 2000 range - 15秒継続 - グループの攻撃速度を 37% 増加させる"],
     text "新しい魔法ダメージ緩和ソングが追加される。このソングは効果時間が終わった後に自動的に更新されない。",
     ulist ["Level 9 - Song of Spell Protection - 3.5s cast - 1500 range - 15秒継続 - グループの二次魔法レジストを 3% 増加させる。",
            "Level 19 - Song of Spell Warding - 3.5s cast - 1500 range - 15秒継続 - グループの二次魔法レジストを 7% 増加させる。",
            "Level 29 - Song of Spell Shielding - 3.5s cast - 1500 range - 15秒継続 - グループの二次魔法レジストを 10% 増加させる。",
            "Level 39 - Song of Spell Degradation - 3.5s cast - 1500 range - 15秒継続 - グループの二次魔法レジストを 15% 増加させる。",
            "Level 49 - Song of Spell Invulnerability - 3.5s cast - 1500 range - 15秒継続 - グループの二次魔法レジストを 20% 増加させる。"],
     text "新しいスペル射程ソングが追加される。このソングは効果時間が終わった後に自動的に更新されない。",
     ulist ["Level 8 - Song of Magical Reach - 3.5s cast - 1500 range - 30秒継続 - グループの魔法の射程を 2% 増加させる。",
            "Level 18 - Song of Arcane Reach - 3.5s cast - 1500 range - 30秒継続 - グループの魔法の射程を 4% 増加させる。",
            "Level 28 - Song of Wizardic Reach - 3.5s cast - 1500 range - 30秒継続 - グループの魔法の射程を 6% 増加させる。",
            "Level 38 - Song of Supreme Reach - 3.5s cast - 1500 range - 30秒継続 - グループの魔法の射程を 8% 増加させる。",
            "Level 48 - Song of Sorcerous Reach - 3.5s cast - 1500 range - 30秒継続 - グループの魔法の射程を 10% 増加させる。"]]


all : List (Html Message)
all = patch_1_121 ++ patch_1_122B ++ patch_1_122B_HotFix2
      ++ patch_1_123
