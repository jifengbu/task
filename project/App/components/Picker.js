'use strict';

import Picker from 'react-native-picker';

module.exports = (pickerData, selectedValue, title)=>
{
    return new Promise(async(resolve)=>{
        Picker.isPickerShow((show)=>{
            if (show) {
                Picker.hide();
            } else {
                Picker.init({
                    pickerConfirmBtnText: '确定',
                    pickerConfirmBtnColor: [0, 0, 255, 1],
                    pickerCancelBtnText: '取消',
                    pickerCancelBtnColor: [255, 0, 0, 1],
                    pickerTitleText: title||'',
                    pickerTitleColor: [255, 255, 255, 1],
                    pickerToolBarBg: [0x34, 0xa9, 0xb1, 1],
                    pickerBg: [207, 207, 207, 1],
                    pickerFontColor: [0, 0, 0, 1],
                    pickerToolBarFontSize: 16,
                    pickerFontSize: 16,
                    pickerData,
                    selectedValue,
                    onPickerConfirm: (value)=>{resolve(value)},
                });
                Picker.show();
            }
        });
    });
};
module.exports.hide = ()=>{
    Picker.isPickerShow((show)=>{
        Picker.hide();
    });
};
