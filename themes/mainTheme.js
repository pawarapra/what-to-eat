import { createTheme } from '@rneui/themed';

// color palette
const themePalette = {
    primarylightyellow: '#ffe175',
    primarydarkyellow: '#f5c94a',
    primaryorange: '#ff724c',
    primarylgreen: '#84c680',

    grey: '#333',
    greyDarker: '#888888',
    greyLighter: '#fff'
}

// a theme follows the pattern: components > [ComponentType] > [ComponentStyle]
export const mainTheme = createTheme({    
    components: {
        Button: (buttonProps) => ({
            buttonStyle: {
                raised: true,
                borderRadius: 40,
                backgroundColor: themePalette.primaryorange,
            },
            titleStyle: {
                color: themePalette.greyLighter,
                fontSize: 20,
                fontWeight: 'normal',
                fontFamily: 'Anton_400Regular',
                paddingVertical: 10,
            },
            icon: {
                color: themePalette.greyLighter,
            },
            type: 'clear',
        }),


        Text: {
            h1Style: {
                color: themePalette.grey,
                fontWeight: 'normal',
                fontFamily: 'Anton_400Regular',
            },
            h2Style: {
                color: themePalette.grey,
                fontSize: 23,
                fontWeight: 'normal',
                fontFamily: 'Anton_400Regular',    
            },
            h3Style: {
                color: themePalette.grey,
                fontSize: 18,
                margin: 5,
                fontWeight: 'normal',
                fontFamily: 'Anton_400Regular',
            },
            h4Style: {
                color: themePalette.grey,
                fontSize: 14,
                // margin: 5,
                fontWeight: 'normal',
                fontFamily: 'Anton_400Regular',
            },
            style: {
                margin: 5,
                fontSize: 18,
                fontFamily: 'RobotoCondensed_700Bold',
            }
        },

        // Icon: {
        //     color: themePalette.grey,
        // },



        Avatar: {
            avatarStyle: {
                borderColor: themePalette.primarydarkyellow,
                borderWidth: 1
            },
            size: 70
        },
        

        // Divider: {
        //     color: themePalette.primaryLighter,
        //     width: 2,
        // },        

        // FAB: {
        //     buttonStyle: {
        //         raised: true,
        //         borderRadius: 15,
        //         backgroundColor: themePalette.primary,
        //     },
        //     titleStyle: {
        //         color: themePalette.alternate,
        //     },
        //     icon: {
        //         color: themePalette.alternate,            
        //     },
        //     type: 'clear',
        // },
    },


});