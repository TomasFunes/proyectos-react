import { describe, expect, it} from "vitest";
import { render, screen } from '@testing-library/react';
import List from "../components/list";

describe ('list testing', () => {
    it('renders correctly', () => {
        render(<List id={1} title="List title" onUpdate={() => {}} onDelete={() => {}}/>)

        const listTitle = screen.getByRole('heading', {
            level: 2,
            name: "List title",
        });
        const configBtn = screen.getByRole('button');


        expect(listTitle).toBeInTheDocument();
        expect(configBtn).toBeInTheDocument();
    })
})