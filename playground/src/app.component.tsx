import { type Component } from 'solid-js';
import { Tooltip } from './components/tooltip/tooltip.component';
import { type TooltipDirective, tooltip } from './solid-js-tooltip';
import './app.styles.css';
import { debounce, throttle } from './utils';

declare module 'solid-js' {
  namespace JSX {
    interface Directives extends TooltipDirective {}
  }
}

export const App: Component = () => {
  // https://github.com/solidjs/solid/discussions/845 (BE AWARE!!!)
  tooltip;

  return (
    <main>
      <div id="Inner">
        <u>
          <h1
            class="highlight-text"
            style={{
              display: 'inline-block',
            }}
            use:tooltip={{
              tooltips: [
                {
                  element: <Tooltip>This is heading!</Tooltip>,
                  position: 'top-left',
                },
                {
                  element: <Tooltip>Yeah, it is!</Tooltip>,
                  position: 'right-center',
                },
              ],
              // onMouseenter: throttle((event, listener) => {
              //   console.log('"onMouseenter" args:', { event, listener });
              //   listener(event);
              // }, 2000),
              // onMouseenter: throttle((event) => {
              //   console.log('"onMouseenter" args:', { event });
              // }, 2000),
              onMouseenter: {
                listener(event, innerListener) {
                  console.log('"onMouseenter" args:', { event, innerListener });

                  innerListener(event);
                },
              },
            }}
            tabIndex={0}
          >
            Lorem Ipsum
          </h1>
        </u>
        <h4>
          "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
          <u
            class="highlight-text"
            use:tooltip={{
              tooltips: [
                {
                  element: <Tooltip>"consectetur"</Tooltip>,
                  position: 'left-bottom',
                },
              ],
            }}
            tabIndex={0}
          >
            consectetur
          </u>
          , adipisci velit..."
        </h4>
        <h5>
          "There is no one who loves pain itself, who seeks after it and wants
          to have it, simply{' '}
          <u
            class="highlight-text"
            use:tooltip={{
              tooltips: [
                {
                  element: <Tooltip>Eah... it is pain...</Tooltip>,
                  position: 'bottom-center',
                },
              ],
            }}
            tabIndex={0}
          >
            because it is pain...
          </u>
          "
        </h5>

        <hr />

        <div id="Content">
          <div class="boxed">
            <div id="lipsum">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                diam augue, maximus ac nulla vel, tristique fermentum ligula.
                Proin eu mollis dolor. Aliquam erat volutpat. Donec eget est
                semper, sodales tortor non, blandit metus. Sed velit felis,
                lobortis feugiat suscipit{' '}
                <b
                  class="highlight-text"
                  use:tooltip={{
                    tooltips: [
                      {
                        element: (
                          <Tooltip>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Doloribus, provident?
                          </Tooltip>
                        ),
                        position: 'top-center',
                      },
                    ],
                  }}
                  tabIndex={0}
                >
                  non
                </b>
                , feugiat ac magna. Vestibulum mollis pharetra est, a gravida
                dolor vehicula quis. Etiam vestibulum id lorem congue faucibus.
                Morbi sit amet auctor purus. Suspendisse potenti. Praesent
                ultricies auctor dui, in pretium massa aliquam et. Maecenas ac
                pulvinar ipsum. Quisque imperdiet pellentesque urna, eget
                pharetra urna tincidunt vitae. Pellentesque ornare in metus et
                iaculis. Aenean nisi turpis, dictum et tempus at, efficitur quis
                neque. Donec quis porttitor justo. Mauris venenatis odio dui, et
                iaculis leo efficitur sagittis.
              </p>
              <p>
                Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas. Aenean congue, libero eu
                accumsan varius, mi sem posuere ex, nec mollis mauris urna non
                felis.{' '}
                <b
                  class="highlight-text"
                  use:tooltip={{
                    tooltips: [
                      {
                        element: <Tooltip>???</Tooltip>,
                        position: 'right-center',
                      },
                    ],
                  }}
                  tabIndex={0}
                >
                  Etiam
                </b>{' '}
                convallis lobortis eros vel feugiat. Duis pulvinar euismod
                malesuada. Nullam rutrum dignissim consequat. Sed diam nibh,
                posuere ac tempor non, venenatis in nisi. Etiam et fringilla
                felis. Aenean in arcu vulputate tellus condimentum interdum.
                Donec odio nisi, suscipit eget lobortis sed, condimentum sed
                diam. Nullam eget erat id nulla ullamcorper ultrices. Cras
                sodales diam augue, vel dictum metus lobortis vitae. Morbi
                auctor nunc eu faucibus volutpat. Mauris porta hendrerit est in
                tempus. Phasellus elementum nisi eu odio malesuada aliquam. Sed
                imperdiet libero dignissim lorem molestie, id porta velit
                faucibus. Aenean blandit justo nibh, tristique accumsan magna
                consequat in.
              </p>
              <p>
                <b
                  class="highlight-text"
                  use:tooltip={{
                    tooltips: [
                      {
                        element: <Tooltip>Lorem ipsum dolor sit amet.</Tooltip>,
                        position: 'top-right-corner',
                      },
                    ],
                  }}
                  tabIndex={0}
                >
                  Maecenas
                </b>{' '}
                vitae pulvinar velit, ut maximus sem. Vivamus dolor sem,
                molestie sit amet posuere sagittis, varius non urna. Sed quis
                venenatis libero. Aenean elit enim, mollis iaculis ultrices ac,
                semper nec arcu. Donec lorem magna, suscipit vitae porttitor ut,
                luctus id leo. Etiam volutpat erat ac fermentum volutpat. Donec
                aliquet sapien ac libero convallis, in viverra nisl tincidunt.
                Aenean faucibus ac velit non pellentesque. Aliquam in quam ac
                massa faucibus interdum eget non ipsum. Proin a nisl nec lacus
                cursus scelerisque. Fusce consectetur condimentum blandit.
                Curabitur sit amet lectus varius, varius diam at, facilisis
                mauris. Pellentesque rutrum velit lectus, dapibus porta risus
                luctus et.
              </p>
              <p>
                Orci varius natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus. Vestibulum pharetra erat suscipit,
                tempor sem et, tristique neque. Nam bibendum enim eget ornare
                pretium. Vivamus iaculis sem ut sapien efficitur aliquet.
                Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas. Sed nec lacinia enim, sit
                amet eleifend urna. Praesent volutpat posuere sapien eu
                vulputate. Sed sapien urna, mattis ut nisi sed, dapibus placerat
                lacus. Aliquam erat volutpat. Pellentesque dolor odio, molestie
                vel convallis id, mollis euismod erat. In{' '}
                <b
                  class="highlight-text"
                  use:tooltip={{
                    tooltips: [
                      {
                        element: (
                          <Tooltip>
                            nisi nisl nisi nisl nisi nisl nisi nisl nisi nisl
                            nisi nisl nisi nisl nisi nisl nisi nisl
                          </Tooltip>
                        ),
                        position: 'bottom-right-corner',
                      },
                    ],
                  }}
                  tabIndex={0}
                >
                  nisi nisl
                </b>
                , rutrum eget eros in, condimentum egestas nisl.
              </p>
              <p>
                Nullam sem turpis, lobortis at interdum ac, dapibus eu lectus.
                Phasellus consequat viverra lorem sed mollis. Sed hendrerit diam
                sed sollicitudin accumsan. Donec sem nibh, hendrerit quis
                dignissim non, placerat a leo. Integer nec tellus maximus,
                viverra arcu at, iaculis velit. Vestibulum cursus sapien sapien,
                et malesuada quam efficitur at. Nunc aliquet urna a felis
                sodales, in ultrices erat dignissim. Sed malesuada arcu nec
                sapien mollis mattis. Ut ultricies ligula vel pulvinar molestie.
              </p>
              <p>
                Donec velit tortor, ultrices sed turpis sed, rhoncus consectetur
                magna. Praesent lectus nibh, pretium sit amet eleifend eu,
                imperdiet a metus. Mauris sed aliquam quam. Suspendisse potenti.
                Nam iaculis felis id tellus mattis, id congue metus volutpat.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos. Vestibulum semper orci aliquet
                ornare posuere. Integer at felis ante. Cras vulputate eleifend
                urna nec elementum. Fusce imperdiet lectus est, quis gravida
                nulla fermentum quis.
              </p>
              <p>
                Curabitur elementum tellus augue, id auctor magna pulvinar vel.
                Nullam sed tempus est. Proin eget eros in felis mollis
                convallis. Integer vitae libero et ipsum tempor laoreet. Donec
                at iaculis massa, quis vestibulum mi. Nulla commodo enim non
                sapien consectetur vestibulum. Sed at accumsan urna. Nunc
                bibendum aliquet ultricies. Integer vel ante justo. Nullam sit
                amet tortor sit amet nisl blandit porta ac vitae urna. Mauris
                feugiat semper auctor. Nam urna nunc, eleifend nec tincidunt
                nec, vestibulum sit amet eros.
              </p>
              <p>
                Ut tempor purus eget faucibus facilisis.{' '}
                <b
                  class="highlight-text"
                  use:tooltip={{
                    tooltips: [
                      {
                        element: (
                          <Tooltip>I don't know what this about...</Tooltip>
                        ),
                        position: 'bottom-right',
                      },
                    ],
                  }}
                  tabIndex={0}
                >
                  Morbi sed sollicitudin leo. Praesent pretium at mauris non
                  euismod.
                </b>{' '}
                Pellentesque dapibus enim nunc. Sed nulla dolor, vehicula a
                purus nec, eleifend mollis nisi. Vestibulum vitae rutrum velit.
                Sed scelerisque elit ac purus gravida, a facilisis nisl feugiat.
                Aenean rhoncus dui sit amet convallis egestas. Integer porttitor
                tristique purus, ac varius enim dapibus et. Praesent suscipit
                risus eu velit semper, vitae aliquam tellus tristique. In
                malesuada elementum massa dictum rutrum. Mauris elementum auctor
                est, sit amet faucibus elit. Vestibulum ut volutpat lacus.
              </p>
              <p>
                Etiam convallis feugiat ullamcorper. Donec id iaculis mi. Sed
                urna nulla, sodales sed luctus sit amet, faucibus eu orci.
                Aliquam euismod gravida velit quis tristique. In dignissim
                finibus neque, nec facilisis tellus cursus non. Integer quis
                malesuada justo, nec faucibus enim. Phasellus vel laoreet odio,
                eu dictum elit. Nulla nibh enim, pretium sit amet finibus et,
                hendrerit eget elit. Ut suscipit iaculis metus, in faucibus odio
                vulputate vel. Praesent scelerisque dignissim ante, ut tempus
                dolor pulvinar eget. Nunc euismod at magna id maximus. Nullam
                consequat vestibulum ante elementum euismod. Sed aliquet
                interdum suscipit. Aliquam aliquet semper diam, vel malesuada
                ipsum suscipit a. Duis fringilla metus purus, ut scelerisque
                enim facilisis vel.
              </p>
              <p>
                Interdum et malesuada fames ac ante ipsum primis in faucibus.
                Praesent id fringilla nunc. Integer vulputate sapien eu tortor
                finibus, eu varius libero tempus. Etiam eget odio a nibh mattis
                malesuada id et nisi. Cras ut quam magna. Vivamus dolor orci,
                aliquet eu nulla eu, varius tempor urna. Nunc id posuere ex, a
                sagittis justo. Ut congue mi cursus arcu tincidunt luctus. Nam a
                rhoncus erat. Phasellus ac auctor dolor. Mauris venenatis
                pulvinar nisi, efficitur vehicula nunc. Integer in purus sit
                amet lectus tincidunt rutrum id nec leo. Nam ullamcorper nibh
                vel imperdiet volutpat. Pellentesque lobortis lorem a rhoncus
                vulputate.
              </p>
              <u>
                <p
                  class="highlight-text"
                  use:tooltip={{
                    tooltips: [
                      {
                        element: (
                          <Tooltip>
                            I don't understand this part eather...
                          </Tooltip>
                        ),
                        position: 'bottom-left',
                      },
                    ],
                  }}
                  tabIndex={0}
                >
                  Aenean et rutrum augue, a blandit magna. Praesent tincidunt
                  ullamcorper quam, vel facilisis urna. Pellentesque posuere sed
                  magna vitae vestibulum. Aliquam pharetra sodales molestie.
                  Quisque rhoncus enim nisl, ut malesuada dui blandit a. Quisque
                  euismod pellentesque tellus id fringilla. Pellentesque
                  convallis lorem nisl, ut pellentesque orci vestibulum in.
                  Nulla facilisi. Nunc ut turpis purus. Donec nec velit et dui
                  congue maximus in sed nisl. Sed quis nibh et erat viverra
                  tempor. Etiam pretium urna non finibus dapibus. Nam sed erat
                  rutrum urna faucibus posuere. In scelerisque ex eros, eget
                  finibus neque finibus non. Mauris in pharetra est. Praesent id
                  ultricies sem, in tempus quam (222).
                </p>
              </u>
              <p
                class="highlight-text"
                style={{ outline: '1px solid blue' }}
                use:tooltip={{
                  tooltips: [
                    {
                      element: (
                        <Tooltip>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. In, dolor?
                        </Tooltip>
                      ),
                      position: 'top-right',
                      // displayOnHover: false,
                      // displayOnFocus: false,
                    },
                  ],
                  // onMouseenter: (event) => {
                  //   console.log('onMouseenter:', event);
                  // },
                  // onMouseleave: (event) => {
                  //   console.log('onMouseleave:', event);
                  // },
                  // onFocusin: (event) => {
                  //   console.log('onFocusin:', event);
                  // },
                  // onFocusout: (event) => {
                  //   console.log('onFocusout:', event);
                  // },
                }}
                tabIndex={0}
              >
                Aliquam vehicula lorem finibus felis tincidunt fringilla.
                Suspendisse consectetur arcu sit amet nisi consequat, sit amet
                tempus libero tincidunt. Donec aliquam, ex nec bibendum cursus,
                neque mi varius nunc, non eleifend justo ipsum eu mauris. Aenean
                nec accumsan erat. Nunc ultrices diam leo, sollicitudin dictum
                tortor pharetra eu. Nullam vestibulum ac nulla non dignissim.
                Praesent dictum lorem vel ligula rutrum convallis. Praesent
                laoreet cursus nisl, eu volutpat ex congue vel. Donec lectus
                turpis, porttitor a placerat a, consectetur nec enim. Aliquam ac
                nisi ac massa sagittis bibendum. Donec id auctor mi, non
                sagittis quam. Aenean blandit libero ut rhoncus auctor. Nulla
                finibus orci et lacus accumsan, vel molestie augue vulputate.
                Sed vitae facilisis elit, a euismod lorem11111.
              </p>
              <p>
                Donec facilisis consequat eros. Praesent laoreet sed justo nec
                sodales. Cras nec condimentum mi, sit amet condimentum dui.
                Quisque eu ligula vehicula, scelerisque elit non, rhoncus
                lectus. Integer dolor erat, lacinia eget imperdiet vitae, auctor
                tincidunt libero. Vivamus rutrum condimentum sem non cursus. Ut
                felis ante, posuere a ante sit amet, rutrum interdum enim. Fusce
                nec nisi vitae elit semper ultricies quis sed odio.
              </p>
              <p>
                Donec nec imperdiet libero, a dignissim sapien. Donec tempor,
                nulla et tristique efficitur, felis magna fringilla augue, et
                cursus lorem elit in erat. Sed arcu odio, consectetur id turpis
                sed, imperdiet vulputate ex. Proin orci risus, efficitur nec
                justo id, semper gravida magna. Sed vel lorem id justo dapibus
                posuere. Morbi pharetra odio odio, vitae aliquet quam tincidunt
                fringilla. Nunc rhoncus luctus consequat. Donec posuere libero
                nunc, quis pretium est suscipit id. In consectetur euismod
                lobortis. Fusce in tincidunt mi. Nulla tempus, nunc at imperdiet
                cursus, nunc massa euismod urna, vel tempor lorem nisi vel nisi.
                Vestibulum eget felis eget sapien tincidunt ullamcorper.
                Phasellus fringilla, felis quis sagittis suscipit, nisi tellus
                fringilla tortor, quis accumsan ante mauris vitae urna. In sed
                malesuada diam, ut scelerisque justo. Donec euismod erat vitae
                mauris mattis, sed pellentesque est consectetur. Nam turpis
                dolor, fringilla in vulputate id, euismod ac sapien.
              </p>
              <p>
                Donec iaculis faucibus dolor, nec efficitur tellus eleifend
                vitae. Aenean at massa pellentesque, facilisis mauris quis,
                pretium eros. Sed egestas faucibus lacus, fermentum tristique
                ligula elementum sit amet. Pellentesque rhoncus orci felis, sit
                amet varius sapien condimentum quis. Donec non vehicula lectus,
                vel posuere tellus. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Donec viverra ipsum nisi, eget iaculis lectus
                tempus tempus. Mauris iaculis rutrum ipsum, quis vulputate dui
                pellentesque rhoncus. Nunc dolor lacus, bibendum non tellus
                quis, blandit imperdiet turpis. Donec varius ac turpis id
                pretium.
              </p>
              <u
                class="highlight-text"
                use:tooltip={{
                  tooltips: [
                    {
                      element: <Tooltip>?</Tooltip>,
                      position: 'bottom-left-corner',
                    },
                  ],
                }}
                tabIndex={0}
              >
                <p>
                  Maecenas blandit arcu eget rutrum sodales. Vestibulum tempor
                  mi nec metus elementum fermentum. Aenean a gravida justo, nec
                  pharetra massa. In aliquet, eros a lobortis lacinia, neque
                  nulla pharetra ante, sit amet blandit ex sem at mauris. Sed at
                  ornare augue. Cras dapibus accumsan lectus laoreet accumsan.
                  Pellentesque tempus posuere mi id interdum. Nullam eget ante
                  ut eros porttitor porttitor sit amet eu dolor. Pellentesque
                  non metus erat. Mauris non odio commodo, volutpat dolor ut,
                  aliquam est. Curabitur vel dui nisl. In hac habitasse platea
                  dictumst. Phasellus malesuada, nisl ut consequat sagittis,
                  lectus arcu blandit urna, ac pharetra orci magna ut enim. Nunc
                  ut justo in tortor consequat auctor. Aliquam pulvinar arcu et
                  lacus pretium aliquam non eu magna.
                </p>
              </u>
              <p>
                Nunc hendrerit, neque a sagittis maximus, neque felis facilisis
                lectus, et malesuada libero odio nec elit. Cras et posuere
                tortor. Aliquam pharetra sem ut laoreet venenatis. Vestibulum
                lobortis gravida metus in ultrices. In hac habitasse platea
                dictumst. Etiam dictum eleifend justo, sit amet porttitor lectus
                ullamcorper eget. Morbi aliquet, nibh non porta euismod, metus
                est tincidunt ex, id vehicula massa metus id arcu. Nunc quis
                tincidunt metus, eu dapibus ligula.
              </p>
              <p>
                Nam faucibus rutrum urna eu ornare. Nullam dui tellus, varius
                quis cursus et, elementum in ante. Vestibulum sapien urna,
                pellentesque sed tellus ut, laoreet semper nisl. Integer ligula
                augue, iaculis vitae tortor vel, dapibus tempor urna. Praesent
                facilisis, ante eget congue lobortis, nisl ex semper nisi, ac
                euismod dolor risus a eros. Mauris lacinia mi eget nunc
                interdum, vitae sagittis ipsum maximus. Morbi pretium molestie
                posuere. Curabitur eget tristique odio. Nunc consequat egestas
                justo in bibendum. Etiam viverra nulla et nisl sollicitudin, vel
                convallis leo commodo. Nam interdum lacus nec pharetra sagittis.
                Sed placerat nunc ac purus tristique lobortis. Aenean eu neque
                lorem. Vestibulum sodales augue quis erat congue tincidunt.
                Vestibulum quis porttitor est, vel lobortis leo. Fusce sit amet
                iaculis metus.
              </p>
              <p>
                Vestibulum pharetra nibh ut lorem tempor tempus. Fusce congue ex
                eget pretium consectetur. Pellentesque hendrerit arcu dolor, in
                condimentum diam lobortis at. Maecenas lectus eros, tristique
                vitae pretium at, porttitor in libero. Nunc ac felis at purus
                volutpat lobortis. Nulla eu turpis dui. Suspendisse dui nulla,
                luctus viverra molestie quis, suscipit at dui. Suspendisse
                efficitur nisl vel enim tincidunt sollicitudin. Ut mollis
                sagittis nunc, nec commodo arcu posuere sed. Duis dignissim
                dolor non nisl volutpat varius.
              </p>
              <p>
                Morbi velit risus, accumsan ac efficitur id, cursus fringilla
                leo. Cras turpis tortor, pretium id placerat id, dapibus nec
                nisi. Proin sagittis eros vel nulla posuere pretium. In congue
                urna diam, nec sodales erat laoreet a. Sed id hendrerit magna.
                Pellentesque efficitur elit condimentum dolor facilisis, sed
                bibendum mauris congue. Proin molestie eleifend rhoncus. Class
                aptent taciti sociosqu ad litora torquent per conubia nostra,
                per inceptos himenaeos. Suspendisse fermentum metus elit, at
                lacinia ex iaculis posuere.
              </p>
              <p>
                Ut venenatis rhoncus risus, id posuere nisl rutrum quis.
                Maecenas hendrerit hendrerit ipsum vitae fermentum. Nam vel
                placerat ante. Donec et erat commodo, volutpat enim et, dapibus
                felis. Nam vulputate sagittis odio, quis lobortis nulla
                elementum nec. Nunc viverra suscipit lobortis. In sollicitudin
                condimentum urna sed pretium.
              </p>
              <p>
                Aliquam dignissim rutrum est nec gravida. Duis varius nulla eget
                urna ullamcorper vestibulum. Nullam dapibus diam eget est
                aliquet, ac finibus mi laoreet. Aliquam sem tortor, efficitur
                tempus malesuada et, dignissim id nunc. Maecenas malesuada risus
                magna, vel eleifend tortor accumsan vel. Suspendisse accumsan
                molestie elit a congue. Ut at varius felis. Pellentesque
                lobortis nisi ut mauris ultricies accumsan. Praesent varius ante
                quis purus imperdiet vestibulum. Maecenas tincidunt felis in
                lectus bibendum, eget efficitur dui pellentesque. Nullam sed
                malesuada nibh. Vivamus sodales eget nibh quis auctor. Praesent
                vitae augue a nibh tempor placerat.
              </p>
              <p>
                Nulla non ligula quis diam finibus gravida eu vitae ante. In ac
                sagittis tortor. Pellentesque ipsum metus, feugiat auctor
                vulputate placerat, tincidunt et eros. Duis sed urna eget velit
                sodales dignissim. Nulla vitae arcu tempor, sodales arcu eget,
                dictum lacus. Ut cursus leo quis odio scelerisque, id finibus
                ante dapibus. Praesent dignissim ornare quam eget porttitor.
                Morbi ac semper tellus. Nam dictum commodo magna at convallis.
                Donec congue libero vel arcu fermentum, sed porttitor nisl
                semper. Praesent sed diam eget turpis lacinia dictum. Ut
                ultricies libero dui, vel laoreet nibh sollicitudin vel.
                Vestibulum aliquet dolor et accumsan fermentum. Curabitur
                iaculis nisi mauris, in sollicitudin orci consectetur quis.
                Proin vitae hendrerit metus. Phasellus pharetra risus non
                ullamcorper cursus.
              </p>
              <p>
                Mauris nisi quam, mollis vitae mollis ac, molestie vulputate
                magna. Sed pellentesque lobortis viverra. Morbi gravida in sem
                accumsan laoreet. Nulla pellentesque sapien lectus, imperdiet
                ultrices urna efficitur quis. Phasellus vitae fermentum elit.
                Aenean a est tellus. Donec ultricies dui sed imperdiet
                pellentesque. Duis aliquet dolor sed mi posuere, vel sagittis
                leo faucibus. Nullam convallis lacus ut quam dignissim molestie.
                Nulla luctus augue sodales, feugiat quam sagittis, laoreet enim.
                Aliquam auctor auctor quam, sit amet pretium felis porta in.
              </p>
              <p>
                Aliquam commodo enim mollis euismod porta. Pellentesque commodo
                non ligula sed auctor. Ut cursus lacinia aliquet. Suspendisse
                potenti. Vestibulum ante ipsum primis in faucibus orci luctus et
                ultrices posuere cubilia curae; In a nulla dignissim, dictum
                purus at, tempus mauris. Morbi sed ultrices urna, vel dapibus
                dui. Integer venenatis ipsum a augue interdum pellentesque.
                Praesent a tristique urna. Nunc feugiat, nisi quis dictum
                tincidunt, lectus eros faucibus risus, malesuada rhoncus neque
                diam vel dolor. In vitae tincidunt orci, blandit placerat sem.
              </p>
              <p>
                Nam eu odio et lorem dignissim finibus at eu ante. Donec aliquet
                efficitur leo id rutrum. Mauris consequat est lectus, eget
                facilisis eros sagittis sit amet. Vivamus ac dui quis est mattis
                egestas. Nullam imperdiet fringilla efficitur. Maecenas semper
                felis velit, ac accumsan metus fringilla eu. Integer id
                vulputate enim, eu pellentesque enim. Suspendisse tristique
                rutrum nisl in aliquet. Sed sed cursus magna, a rhoncus nisi.
                Integer ut justo vel dui consequat posuere. Nam faucibus ex
                dolor, vel convallis metus tristique a. Aliquam erat volutpat.
                Proin viverra sapien ultricies lorem auctor ullamcorper. Etiam
                sit amet gravida erat. Fusce elementum volutpat ligula quis
                ultricies. Etiam tempor iaculis ante, eu sagittis arcu.
              </p>
              <p>
                Vestibulum vitae augue eleifend, tempus neque vitae, mattis
                turpis. Vivamus vitae leo eu ligula semper varius. Duis a dui
                eget lorem viverra maximus nec eget sem. Fusce ornare orci urna,
                eu tempus mi rutrum vitae. Suspendisse sem nisl, interdum eu
                volutpat sit amet, ornare nec est. Nullam in egestas nibh. Cras
                rhoncus justo eu varius congue. Etiam convallis tincidunt purus,
                quis suscipit ligula placerat eget. Maecenas mattis nunc in
                turpis dictum vehicula. Donec vel egestas tortor.
              </p>
              <p>
                Cras orci purus, cursus consectetur rhoncus sed, volutpat sed
                neque. Class aptent taciti sociosqu ad litora torquent per
                conubia nostra, per inceptos himenaeos. Quisque sodales ex a
                turpis hendrerit, eu laoreet ex imperdiet. Ut auctor rhoncus
                velit eget lobortis. Vestibulum malesuada semper felis non
                auctor. Aliquam mauris eros, congue non nibh eget, sollicitudin
                dignissim sem. Nam nec metus in erat molestie bibendum non ac
                orci. Sed sodales tincidunt finibus. Donec id ipsum
                pellentesque, dignissim urna mollis, consectetur odio. Mauris
                non scelerisque augue.
              </p>
              <p>
                Fusce a odio sollicitudin, vehicula quam eu, viverra leo. Mauris
                consequat eget massa sit amet faucibus. Aliquam nisl ligula,
                faucibus rutrum diam at, aliquam vestibulum orci. Nulla porta,
                augue non consequat feugiat, dui dui maximus velit, eu feugiat
                tellus lectus at nisi. Duis eros tellus, finibus vel dignissim
                vel, dapibus eget mi. Orci varius natoque penatibus et magnis
                dis parturient montes, nascetur ridiculus mus. Donec fermentum,
                odio in ultrices eleifend, turpis nibh vehicula magna, in
                lacinia arcu enim vitae sem. Nam mollis arcu nec leo fringilla,
                ut feugiat nulla imperdiet. Aliquam id eros mi. Vestibulum sit
                amet metus ipsum. Aliquam erat volutpat.
              </p>
              <p>
                Nullam a purus velit. Proin arcu nibh, tempor id ipsum nec,
                ornare venenatis lorem. Etiam condimentum et metus nec congue.
                Sed id nibh in justo porttitor suscipit consectetur non tellus.
                Vestibulum sed tortor odio. Maecenas eleifend nisi in orci
                dapibus condimentum. Aliquam convallis efficitur justo, eu
                gravida augue pellentesque vel. Nam pellentesque, velit a tempus
                cursus, orci quam sodales urna, quis tristique lorem enim quis
                nibh. Praesent eu elit ornare, laoreet metus sit amet, fermentum
                nisl.
              </p>
              <p>
                Aliquam finibus magna vel ipsum efficitur ornare. Nullam
                pellentesque leo a orci facilisis accumsan. Nullam interdum
                maximus orci a pulvinar. Praesent eu dolor convallis, pharetra
                dolor id, rutrum risus. Suspendisse vel nulla quis metus
                accumsan accumsan id quis risus. Duis sed lectus in justo ornare
                sodales. Curabitur interdum auctor augue, fermentum tincidunt
                nulla finibus vitae. Etiam pretium tempor arcu, at tempor lectus
                lobortis vitae. Duis in ultricies felis. Fusce eu nunc congue,
                dignissim magna ac, sodales magna. Integer sagittis sem eu dolor
                mattis, sed euismod nisi blandit.
              </p>
              <p>
                Duis pharetra, risus sit amet facilisis ornare, velit felis
                congue erat, nec rhoncus felis quam sed erat. Nunc aliquam
                blandit elit, quis ultrices sem. Fusce eu orci vel ante
                vulputate fringilla a et felis. Morbi condimentum placerat
                sapien, et malesuada est vehicula eu. Aenean ligula velit,
                vehicula eget nunc vel, scelerisque rhoncus justo. Ut cursus
                aliquam ligula sit amet dictum. Aliquam ac tincidunt orci, in
                blandit lectus. Mauris vel sapien et nisl tempus rutrum sit amet
                eget tellus. Donec in nisi accumsan, faucibus nunc sed, posuere
                tellus.
              </p>
              <p>
                Ut faucibus, dolor nec consequat vehicula, nisl elit cursus est,
                in varius nisl augue non lacus. Nulla lobortis vehicula lorem.
                Fusce fringilla sapien sed mi dictum, fermentum laoreet libero
                ultrices. Mauris lacinia mi vel massa consectetur varius.
                Integer eget ante porttitor nisl rutrum commodo eget id felis.
                Integer pretium pellentesque eros, sit amet ultrices sapien
                maximus at. Fusce at turpis purus. Praesent consectetur mi
                mauris, a rutrum magna sodales non. Donec ullamcorper at odio
                nec aliquam. Donec posuere magna eget condimentum semper. Fusce
                gravida, nulla sed condimentum convallis, lorem purus dignissim
                orci, eu suscipit odio est quis nisi. Aliquam erat volutpat.
                Donec tempor rhoncus enim, at gravida metus consectetur eu.
                Praesent aliquam tellus elit, gravida varius erat feugiat a.
              </p>
              <p>
                Curabitur vehicula aliquet sem, eget consectetur est vehicula
                quis. Integer aliquam risus a neque congue vestibulum. Mauris
                sagittis ullamcorper gravida. Aliquam erat volutpat. In varius
                metus sit amet lorem elementum pharetra. Vivamus feugiat velit
                ipsum, ut aliquam nunc fermentum pellentesque. Vestibulum
                iaculis mi ut nulla maximus, nec maximus orci scelerisque. Proin
                nulla massa, tristique vitae pellentesque sed, vestibulum et
                magna. Quisque in sem eleifend, sagittis purus eget,
                sollicitudin arcu. In efficitur tempor ipsum at posuere. In non
                iaculis nibh. Aenean lorem mi, ultricies at molestie ut, rhoncus
                ac dolor. Interdum et malesuada fames ac ante ipsum primis in
                faucibus. Nam faucibus ligula nec consequat ullamcorper.
              </p>
              <p>
                Nulla interdum ligula sed dictum consequat. Etiam mi nisi,
                elementum id diam nec, ultrices pulvinar nunc. Donec venenatis
                pellentesque mi, at condimentum urna mattis id. Aliquam in nulla
                mattis, dictum ligula a, pharetra massa. Donec id scelerisque
                lacus. Nulla facilisi. Nulla facilisis velit et pharetra
                iaculis.
              </p>
              <p>
                Curabitur ullamcorper ipsum bibendum mollis gravida. Mauris
                aliquam fringilla metus sed accumsan. Ut mattis egestas pretium.
                Praesent mollis laoreet ex a laoreet. Vestibulum ante ipsum
                primis in faucibus orci luctus et ultrices posuere cubilia
                curae; Sed ac cursus tortor. Nullam molestie elit quis cursus
                ornare. Maecenas eget magna ut tortor eleifend lobortis. Sed
                lorem metus, pulvinar id dolor id, lacinia commodo arcu.
              </p>
              <p>
                Aliquam vel felis tristique, vestibulum orci at, laoreet lorem.
                Donec dui nunc, rhoncus a velit et, vulputate cursus sem.
                Vestibulum auctor, arcu sit amet imperdiet aliquam, lacus velit
                convallis urna, vitae viverra ex nulla sed massa. Sed venenatis
                nulla augue, eget tempor metus ornare sed. Sed facilisis erat
                finibus imperdiet ultrices. Sed vehicula feugiat justo in
                dictum. Integer dapibus, orci non ultricies fringilla, eros
                nulla imperdiet urna, eget porttitor nisi turpis vel nulla.
              </p>
              <p>
                Nunc vulputate laoreet quam ut feugiat. Suspendisse erat dolor,
                pulvinar in facilisis imperdiet, tempor vel neque. Integer
                facilisis eget enim sed vulputate. Nulla ultrices, purus ut
                ullamcorper ultrices, ipsum sem placerat tellus, eget tristique
                enim leo sed erat. Cras at lorem semper, pretium tellus at,
                laoreet justo. Aliquam accumsan sapien maximus bibendum rutrum.
                Mauris feugiat hendrerit sem a fermentum. Cras non congue nulla,
                tempor posuere lectus.
              </p>
              <p>
                Curabitur finibus sapien id sem luctus rhoncus. Morbi a felis
                bibendum, varius justo vitae, tempor orci. Aliquam ultrices
                gravida massa, a venenatis arcu pretium id. Proin turpis lorem,
                condimentum blandit semper sagittis, vehicula at eros. Aliquam
                porttitor et magna non pellentesque. Vestibulum consectetur
                lobortis risus, id lacinia ipsum congue non. Sed sagittis tellus
                laoreet nisi convallis viverra. Aliquam blandit ut lectus ac
                tincidunt. Etiam aliquam hendrerit nulla, ut placerat tellus
                varius eget. Fusce vitae tristique nisl. Sed augue dolor,
                porttitor id ante at, blandit elementum eros. Duis rutrum mauris
                neque, a pulvinar magna suscipit ut. In malesuada dignissim
                velit eget pulvinar.
              </p>
              <p>
                Etiam laoreet felis ac molestie semper. In laoreet bibendum
                lorem. Donec ut sem a augue ultricies dictum. Donec at eros et
                nisl ultricies vulputate in non erat. Vestibulum vel blandit
                metus. Sed et dolor a tellus hendrerit gravida. Morbi vel dictum
                nisi. Pellentesque vel ex fermentum, tempor nunc ac, lacinia
                lectus. Nullam vitae bibendum mauris. Phasellus nulla diam,
                ullamcorper maximus sagittis vitae, vulputate quis arcu. Proin
                malesuada lectus non est ullamcorper, quis semper justo
                fringilla. Cras dignissim pharetra venenatis. Morbi varius
                sapien quis mattis rutrum. Vivamus ligula urna, convallis in
                ultricies id, imperdiet non lectus. Duis iaculis nec erat ut
                congue.
              </p>
              <p>
                Maecenas vitae interdum erat, nec congue velit. Suspendisse
                dictum lacus eget velit porta hendrerit id non lacus. Morbi sed
                ante eu ex viverra tincidunt. Proin facilisis ligula at
                malesuada pulvinar. In eget condimentum lectus. Duis id metus at
                nibh posuere hendrerit. Ut fermentum erat a lorem congue congue.
                Sed varius nibh eget sagittis gravida. Interdum et malesuada
                fames ac ante ipsum primis in faucibus. Phasellus ut nunc ut
                justo rhoncus consequat et eget massa.
              </p>
              <p>
                Vestibulum nisi purus, bibendum ac fringilla sed, ornare id
                arcu. Integer in sem posuere, porta elit at, facilisis libero.
                Vestibulum lacinia, mi molestie eleifend ornare, nisl lorem
                sagittis nunc, vitae fermentum diam dolor a leo. Etiam vehicula
                purus dui, molestie tristique ex mollis et. Aliquam ipsum
                tellus, dapibus sit amet consectetur ac, fringilla eget sapien.
                Pellentesque eleifend, purus eget hendrerit venenatis, ex ipsum
                elementum sem, ac imperdiet est orci eget sem. Donec rhoncus
                fermentum dolor quis fringilla. Nunc eget lobortis lectus.
                Suspendisse tempus metus in tempus posuere. Nulla velit purus,
                auctor ut metus sed, ullamcorper condimentum urna. Nunc nec
                iaculis diam. Aliquam in tempus mauris. Etiam porta risus quam,
                vitae auctor erat sagittis vel. Integer consequat, neque et
                iaculis convallis, nisl erat placerat sapien, ac consequat dolor
                metus non dolor.
              </p>
              <p>
                Aenean venenatis condimentum sollicitudin. Vestibulum dictum sem
                ac venenatis suscipit. Aliquam porta faucibus commodo. Praesent
                quis elit sit amet massa hendrerit faucibus at quis ex. Nulla
                finibus ullamcorper elit, non pulvinar sapien ultricies et.
                Maecenas non finibus augue, at consectetur nibh. Phasellus
                auctor felis et magna sagittis ultricies.
              </p>
              <p>
                Praesent nec aliquet eros. Duis placerat varius odio ac finibus.
                Maecenas purus ante, euismod sed convallis sit amet, egestas nec
                eros. Nulla venenatis velit nec pellentesque convallis.
                Phasellus pharetra venenatis sagittis. Etiam lobortis laoreet
                neque, eget pellentesque lacus ullamcorper maximus. Vivamus
                elementum neque ac porta fermentum. Fusce semper purus a
                suscipit sollicitudin. Morbi vestibulum volutpat quam, at
                volutpat mauris consequat id. Aliquam euismod nisl quis mollis
                aliquet.
              </p>
              <p>
                Fusce nec nulla eu nibh euismod laoreet in quis ante. Sed at
                felis nibh. Aliquam magna augue, volutpat eget bibendum non,
                tincidunt sed leo. Donec maximus, dui scelerisque mollis
                viverra, arcu neque luctus lorem, vitae fermentum nisl dui eu
                felis. Curabitur ut libero quis ex lobortis tempus. Pellentesque
                habitant morbi tristique senectus et netus et malesuada fames ac
                turpis egestas. Proin enim augue, blandit nec elit in,
                condimentum vehicula metus. Praesent imperdiet, purus et
                bibendum fringilla, turpis turpis faucibus lectus, vel sagittis
                magna elit ut est. Maecenas rutrum commodo tortor, eu
                condimentum lorem lacinia eu. Aenean vehicula metus tortor,
                vitae elementum mi efficitur ut. Cras quis sem purus. Fusce
                tristique maximus diam non lobortis. Morbi sed vehicula justo.
                Morbi pulvinar, dui id ornare auctor, leo felis tempor tellus,
                ac condimentum nibh ipsum non sapien. Donec eu mollis nisl, ut
                bibendum sapien.
              </p>
              <p>
                Sed a lacus non turpis faucibus consequat. Aliquam condimentum
                lacinia fermentum. Nulla blandit elementum risus a molestie. Sed
                volutpat ligula id quam vulputate volutpat. Phasellus purus
                urna, eleifend sit amet condimentum vel, interdum ac ligula.
                Duis sapien sapien, condimentum eget libero nec, maximus auctor
                ipsum. Duis at interdum urna. Curabitur molestie venenatis
                dapibus.
              </p>
              <p>
                Nam id sagittis massa. Curabitur sit amet eros quis leo pretium
                elementum. Ut ac enim quis nisl facilisis elementum. Duis sit
                amet feugiat velit. Phasellus at mollis massa, vitae volutpat
                odio. Curabitur non tellus odio. Vivamus rutrum diam sem, quis
                hendrerit risus consequat vel. Praesent in tristique felis, vel
                mollis purus. Nulla faucibus, dolor quis elementum mattis,
                libero nibh pretium sem, eget maximus purus dolor id risus.
                Donec ac lectus scelerisque, dignissim velit non, gravida quam.
                Morbi tortor lorem, laoreet in mattis at, pulvinar ut justo.
                Fusce eget libero vitae dui egestas lobortis.
              </p>
              <p>
                Etiam ut mi ex. Maecenas rutrum ante eu purus mollis rhoncus.
                Donec a neque mauris. Donec feugiat, tellus euismod congue
                fermentum, lectus urna ullamcorper nibh, ac eleifend elit elit
                iaculis tortor. Integer elementum, nisl eu ullamcorper
                porttitor, tortor sapien bibendum libero, id consequat ipsum ex
                ut mi. Maecenas pharetra tortor libero, vitae bibendum justo
                blandit et. Vivamus imperdiet ullamcorper pellentesque. Cras
                semper at dolor a dignissim. Phasellus a nunc metus. Ut maximus
                tempor elit suscipit condimentum. Donec sed lorem at libero
                luctus interdum. Orci varius natoque penatibus et magnis dis
                parturient montes, nascetur ridiculus mus. Phasellus quis nisi
                id magna sollicitudin interdum sit amet mattis arcu. Praesent
                dolor augue, ultricies ac rutrum non, egestas vel felis. Nullam
                eget dolor nec libero ultricies vehicula eu sodales nibh. Sed
                aliquam lectus vel turpis vehicula, id faucibus eros egestas.
              </p>
              <p>
                Ut risus mauris, sagittis ac rutrum feugiat, scelerisque sit
                amet lorem. Integer tempor eleifend nisi, non rhoncus leo porta
                id. Cras dictum libero quis dignissim pharetra. Phasellus libero
                arcu, ornare vitae neque eget, posuere cursus arcu. Curabitur
                semper nisl nec sagittis pulvinar. Vivamus scelerisque augue nec
                quam feugiat rhoncus. Phasellus viverra risus nulla, non
                convallis ipsum scelerisque in. Cras elementum, mi sit amet
                dignissim scelerisque, nulla odio iaculis est, ut ornare nibh
                sapien auctor augue. Ut porta pulvinar lectus ac viverra. Duis
                suscipit laoreet rutrum. In hac habitasse platea dictumst.
              </p>
              <p>
                Vivamus vel sodales orci. Praesent at urna dapibus, faucibus
                lorem nec, dignissim lorem. Ut molestie enim vitae arcu faucibus
                rhoncus. Duis sed consectetur ligula, et dapibus purus. Donec
                porttitor ac ligula non laoreet. Quisque porta, dolor a gravida
                condimentum, risus ipsum dapibus ligula, ac efficitur sapien est
                vitae sapien. In aliquam orci posuere lorem elementum, sit amet
                gravida magna hendrerit. Praesent in fringilla urna, ut molestie
                nisl. Nullam sed blandit erat, iaculis commodo mi. Donec id
                sollicitudin lacus, id imperdiet mi. Integer tempus diam ac orci
                suscipit vulputate. Integer ultricies commodo vulputate.
                Curabitur hendrerit dolor nisl, in sollicitudin lorem finibus
                vitae. Integer iaculis lorem nec porta consequat. Sed efficitur
                viverra purus non sagittis. Donec et lectus eget est bibendum
                tincidunt.
              </p>
            </div>
          </div>
        </div>

        <hr />
      </div>
      {/* <NativeTooltips /> */}
    </main>
  );
};
