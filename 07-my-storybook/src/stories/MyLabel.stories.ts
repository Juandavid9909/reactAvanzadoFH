import { Meta, StoryObj } from "@storybook/react";

import { MyLabel, type Props as MyLabelProps } from "../components/MyLabel";

const meta: Meta<MyLabelProps> = {
    title: "UI/labels/MyLabel",
    component: MyLabel,
    tags: ["autodocs"],
    parameters: {
        layout: "centered"
    },
    argTypes: {
        fontColor: {
            control: "color"
        },
        size: {
            control: "select",
        },
    },
} satisfies Meta<typeof MyLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        label: "Basic label"
    }
};

export const AllCaps: Story = {
    args: {
        allCaps: true,
        label: "All caps label",
    }
};

export const Secondary: Story = {
    args: {
        color: "text-secondary",
        label: "Secondary label"
    }
};

export const CustomColor: Story = {
    args: {
        fontColor: "#5517AC",
        label: "Custom color label"
    }
};

export const CustomBackground: Story = {
    args: {
        backgroundColor: "#000000",
        fontColor: "#EEEEEE",
        label: "Custom background",
        size: "h1",
    },
};