// deps-lint-skip-all
import { CSSObject, Keyframes } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import {
  DerivativeToken,
  GenerateStyle,
  UseComponentStyleResult,
  useStyleRegister,
  useToken,
} from '../../_util/theme';

export interface DrawerToken extends DerivativeToken {
  prefixCls: string;
  iconPrefixCls: string;
  drawerHeaderCloseSize: number;
  shadow1Right: string;
  shadow1Left: string;
  shadow1Up: string;
  shadow1Down: string;
  drawerTitleLineHeight: number;
  closeRight: number;
  white: string;
  black: string;
  paddingMd: number;
  modalFooterPaddingVertical: number;
  modalFooterPaddingHorizontal: number;
  hoverColor: string;
  borderColorSplit: string;
  borderStyle: string;
  textColorSecondary: string;
  motionEaseOut: string;
  drawerPrefixCls: string;
}

const antdDrawerFadeIn = new Keyframes('antNoWrapperZoomBadgeIn', {
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<DrawerToken> = (
  token: DrawerToken,
  hashId: string,
): CSSObject => {
  const {
    drawerPrefixCls,
    motionEaseOut,
    motionDurationSlow,
    fontSizeLG,
    drawerTitleLineHeight,
    white,
    closeRight,
    paddingLG,
    paddingMd,
    lineWidth,
    borderStyle,
    radiusBase,
    fontSize,
    lineHeight,
    modalFooterPaddingVertical,
    modalFooterPaddingHorizontal,
    borderColorSplit,
    zIndexPopup,
    colorText,
    textColorSecondary,
    hoverColor,
  } = token;

  return {
    [`${drawerPrefixCls}`]: {
      // FIXME: Seems useless?
      // @drawer-header-close-padding: ceil(((drawerHeaderCloseSize - @font-size-lg) / 2));
      position: 'fixed',
      zIndex: zIndexPopup,
      width: 0,
      height: '100%',
      transition: `width 0s ease ${motionDurationSlow}, height 0s ease ${motionDurationSlow}`,
      [`${drawerPrefixCls}-content-wrapper`]: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        transition: `transform ${motionDurationSlow} ${motionEaseOut},box-shadow ${motionDurationSlow} ${motionEaseOut}`,
        [`${drawerPrefixCls}-content`]: {
          width: '100%',
          height: '100%',
          position: 'relative',
          zIndex: 1,
          overflow: 'auto',
          backgroundColor: white,
          backgroundClip: `padding-box`,
          border: 0,
          [`${drawerPrefixCls}-wrapper-body`]: {
            display: 'flex',
            flexFlow: 'column nowrap',
            width: '100%',
            height: '100%',
            [`${drawerPrefixCls}-header`]: {
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: `${paddingMd}px ${paddingLG}px`, // FIXME px
              color: colorText,
              background: white,
              borderBottom: `${lineWidth}px ${borderStyle} ${borderColorSplit}`, // FIXME px
              borderRadius: `${radiusBase}px ${radiusBase}px 0 0`, // FIXME px

              [`${drawerPrefixCls}-header-title`]: {
                display: 'flex',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
                [`${drawerPrefixCls}-title`]: {
                  flex: 1,
                  margin: 0,
                  color: colorText,
                  fontWeight: 500,
                  fontSize: fontSizeLG,
                  lineHeight: drawerTitleLineHeight,
                },
                [`${drawerPrefixCls}-close`]: {
                  display: 'inline-block',
                  marginRight: closeRight,
                  color: textColorSecondary,
                  fontWeight: 700,
                  fontSize: fontSizeLG,
                  fontStyle: 'normal',
                  lineHeight: 1,
                  textAlign: 'center',
                  textTransform: 'none',
                  textDecoration: 'none',
                  background: 'transparent',
                  border: 0,
                  outline: 0,
                  cursor: 'pointer',
                  transition: `color ${motionDurationSlow}`,
                  textRendering: 'auto',

                  [`${drawerPrefixCls}:focus,${drawerPrefixCls}:hover`]: {
                    color: hoverColor,
                    textDecoration: 'none',
                  },
                },
              },
              [`${drawerPrefixCls}-header-close-only`]: {
                paddingBottom: 0,
                border: 'none',
              },
            },
            [`${drawerPrefixCls}-body`]: {
              flexGrow: 1,
              padding: paddingLG,
              overflow: 'auto',
              fontSize,
              lineHeight,
              wordWrap: 'break-word',
            },
            [`${drawerPrefixCls}-footer`]: {
              flexShrink: 0,
              padding: `${modalFooterPaddingVertical}px ${modalFooterPaddingHorizontal}px`, // FIXME px
              borderTop: `${lineWidth}px ${borderStyle} ${borderColorSplit}`, // FIXME px
            },
          },
        },
      },
      [`${drawerPrefixCls}-mask`]: {
        position: 'absolute',
        insetBlockStart: 0,
        insetInlineStart: 0,
        width: '100%',
        height: 0,
        backgroundColor: textColorSecondary,
        opacity: 0,
        transition: `opacity ${motionDurationSlow} linear, height 0s ease ${motionDurationSlow}`,
        pointerEvents: 'none',
      },
    },
    [`${drawerPrefixCls}${drawerPrefixCls}-open ${drawerPrefixCls}-mask`]: {
      height: '100%',
      opacity: 1,
      transition: 'none',
      animation: `${antdDrawerFadeIn.getName(hashId)} ${motionDurationSlow} ${motionEaseOut}`,
      pointerEvents: 'auto',
    },
  };
};

const genDrawerStyle: GenerateStyle<DrawerToken> = (token: DrawerToken) => {
  const {
    drawerPrefixCls,
    motionDurationSlow,
    shadow1Right,
    shadow1Left,
    shadow1Down,
    shadow1Up,
    lineWidth,
    motionEaseOut,
  } = token;

  return {
    // =================== left,right ===================
    [`${drawerPrefixCls}-left`]: {
      insetInlineStart: 0,
      insetBlockStart: 0,
      width: 0,
      height: '100%',
      [`${drawerPrefixCls}-content-wrapper`]: {
        height: '100%',
        insetInlineStart: 0,
      },
    },
    [`${drawerPrefixCls}-left${drawerPrefixCls}-open`]: {
      width: '100%',
      transition: `transform ${motionDurationSlow} ${motionEaseOut}`,
      [`${drawerPrefixCls}-content-wrapper`]: {
        boxShadow: shadow1Right,
      },
    },
    [`${drawerPrefixCls}-right`]: {
      insetInlineEnd: 0,
      insetBlockStart: 0,
      width: 0,
      height: '100%',
      [`${drawerPrefixCls}-content-wrapper`]: {
        height: '100%',
        insetInlineEnd: 0,
      },
    },
    [`${drawerPrefixCls}-right${drawerPrefixCls}-open`]: {
      width: '100%',
      transition: `transform ${motionDurationSlow} ${motionEaseOut}`,
      [`${drawerPrefixCls}-content-wrapper`]: {
        boxShadow: shadow1Left,
      },
    },
    // https://github.com/ant-design/ant-design/issues/18607, Avoid edge alignment bug.
    [`${drawerPrefixCls}-right${drawerPrefixCls}-open.no-mask`]: {
      insetInlineEnd: lineWidth,
      transform: `translateX(${lineWidth})`,
    },

    // =================== top,bottom ===================
    [`${drawerPrefixCls}-top,${drawerPrefixCls}-bottom`]: {
      insetInlineStart: 0,
      width: '100%',
      height: 0,
      [`${drawerPrefixCls}-content-wrapper`]: {
        width: '100%',
      },
    },

    [`${drawerPrefixCls}-top${drawerPrefixCls}-open,${drawerPrefixCls}-bottom${drawerPrefixCls}-open`]:
      {
        height: '100%',
        transition: `transform ${motionDurationSlow} ${motionEaseOut}`,
      },

    [`${drawerPrefixCls}-top`]: {
      insetBlockStart: 0,
    },

    [`${drawerPrefixCls}-top${drawerPrefixCls}-open`]: {
      [`${drawerPrefixCls}-content-wrapper`]: {
        boxShadow: shadow1Down,
      },
    },

    [`${drawerPrefixCls}-bottom`]: {
      bottom: 0,
      [`${drawerPrefixCls}-content-wrapper`]: {
        bottom: 0,
      },
    },

    [`${drawerPrefixCls}-bottom${drawerPrefixCls}-bottom-open`]: {
      [`${drawerPrefixCls}-content-wrapper`]: {
        boxShadow: shadow1Up,
      },
    },

    [`${drawerPrefixCls}-bottom${drawerPrefixCls}-bottom-open.no-mask`]: {
      insetBlockEnd: lineWidth,
      transform: `translateY(${lineWidth})`,
    },

    // ==================== Hook Components ===================
    //  FIXME: Seems useless?
    // .@{picker-prefix-cls} {
    //   &-clear {
    //     background: @popover-background,
    //   }
    // }
  };
};

// ============================== Export ==============================
export default function useStyle(
  prefixCls: string,
  iconPrefixCls: string,
): UseComponentStyleResult {
  const [theme, token, hashId] = useToken();
  const drawerToken: DrawerToken = {
    ...token,
    prefixCls,
    iconPrefixCls,
    drawerPrefixCls: `.${prefixCls}`,

    black: '#000', // FIXME: hard code
    white: '#fff', // FIXME: hard code
    drawerHeaderCloseSize: 56, // FIXME: hard code
    shadow1Right:
      '6px 0 16px -8px rgba(0, 0, 0, 0.08), 9px 0 28px 0 rgba(0, 0, 0, 0.05),12px 0 48px 16px rgba(0, 0, 0, 0.03)', // FIXME: hard code in v4
    shadow1Left:
      '-6px 0 16px -8px rgba(0, 0, 0, 0.08), -9px 0 28px 0 rgba(0, 0, 0, 0.05), -12px 0 48px 16px rgba(0, 0, 0, 0.03)', // FIXME: hard code in v4
    shadow1Up:
      '0 -6px 16px -8px rgba(0, 0, 0, 0.32), 0 -9px 28px 0 rgba(0, 0, 0, 0.2),0 -12px 48px 16px rgba(0, 0, 0, 0.12)', // FIXME: hard code in v4
    shadow1Down:
      '0 6px 16px -8px rgba(0, 0, 0, 0.32), 0 9px 28px 0 rgba(0, 0, 0, 0.2), 0 12px 48px 16px rgba(0, 0, 0, 0.12)', // FIXME: hard code in v4
    drawerTitleLineHeight: 1.375, // FIXME: hard code
    closeRight: 22, // FIXME: hard code
    paddingMd: 16, // FIXME: hard code
    modalFooterPaddingVertical: 10, // FIXME: hard code
    modalFooterPaddingHorizontal: 16, // FIXME: hard code
    borderColorSplit: new TinyColor({ h: 0, s: 0, v: 94 }).toHexString(), // FIXME: hard code
    hoverColor: new TinyColor('#000').setAlpha(0.75).toRgbString(), // FIXME: hard code
    textColorSecondary: new TinyColor('#000').setAlpha(0.45).toRgbString(), // FIXME: hard code
    borderStyle: 'solid', // FIXME: hard code
    motionEaseOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)', // FIXME: hard code
  };

  return [
    useStyleRegister({ theme, token, hashId, path: [prefixCls] }, () => [
      genBaseStyle(drawerToken, hashId),
      genDrawerStyle(drawerToken),
    ]),
    hashId,
  ];
}