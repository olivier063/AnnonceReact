import { Text, View } from 'react-native'
import React, { Component } from 'react'
import DropDownPicker from 'react-native-dropdown-picker';

export default class DropDownAddAnnonce extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            value: null,
            items: [
                { label: "AUTO-MOTO", value: "1" },
                { label: "IMMOBILIER", value: "2" },
                { label: "MON DEBARRAS", value: "3" },
                { label: "ANIMAUX", value: "4" },
                { label: "SERVICE", value: "5" },

                // { label: "informatique", id: 1 },
                // { label: "cours", id: 2 }
            ]
        };

        this.setValue = this.setValue.bind(this);
        this.setOpen = this.setOpen.bind(this);
    }

    setOpen(open) {
        this.setState({
            open
        });
    }

    setValue(callback) {
        this.setState(state => ({
            value: callback(state.value)
        }));
    }

    setItems(callback) {
        this.setState(state => ({
            items: callback(state.items)
        }));
    }

    render() {
        const { open, value, items } = this.state;

        return (
            <View>
                <DropDownPicker
                    style={{ backgroundColor: '#92AFD7', width: '94%', borderColor: "white", borderWidth: 1 }}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={this.setOpen}
                    setValue={this.setValue}
                    setItems={this.setItems}
                />
            </View>
        );
    }
}

{/* <DropDownPicker
  style={{ backgroundColor: '#92AFD7', width: 150, borderColor: "white", borderWidth: 1 }}
  open={open}
  value={value}
  items={items}
  setOpen={this.setOpen}
  setValue={this.setValue}
  setItems={this.setItems}
  >
  {items.map((item) => (
    <DropDownPicker.Item label={item.label} value={item.label} key={item.id} />
  ))}
</DropDownPicker> */}