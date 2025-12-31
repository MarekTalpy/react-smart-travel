import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';

import ItineraryGeneratorForm from './ItineraryGeneratorForm';

describe('ItineraryGeneratorForm Component', () => {
  it('should render city input, days input and submit button', () => {
    render(<ItineraryGeneratorForm onGenerate={vi.fn()} />);

    expect(screen.getByText(/city/i)).toBeInTheDocument();
    expect(screen.getByText(/days/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /generate-itinerary/i })).toBeInTheDocument();
  });

  it('should update city and days inputs', async () => {
    const user = userEvent.setup();

    render(<ItineraryGeneratorForm onGenerate={vi.fn()} />);

    const cityInput = screen.getByLabelText(/city/i);
    const daysInput = screen.getByLabelText(/days/i);

    await user.type(cityInput, 'Paris');
    await user.clear(daysInput);
    await user.type(daysInput, '3');

    expect(cityInput).toHaveValue('Paris');
    expect(daysInput).toHaveValue(3);
  });

  it('should call onGenerate with correct city and days on submit', async () => {
    const user = userEvent.setup();
    const onGenerate = vi.fn().mockResolvedValue(undefined);

    render(<ItineraryGeneratorForm onGenerate={onGenerate} />);

    await user.type(screen.getByLabelText(/city/i), 'Rome');
    await user.clear(screen.getByLabelText(/days/i));
    await user.type(screen.getByLabelText(/days/i), '5');

    await user.click(screen.getByRole('button', { name: /generate-itinerary/i }));

    expect(onGenerate).toHaveBeenCalledOnce();
    expect(onGenerate).toHaveBeenCalledWith({ city: 'Rome', days: 5 });
  });

  it('should display loading state while submitting', async () => {
    const user = userEvent.setup();

    let resolvePromise;
    const onGenerate = vi.fn(
      () =>
        new Promise((resolve) => {
          resolvePromise = resolve;
        })
    );

    render(<ItineraryGeneratorForm onGenerate={onGenerate} />);

    await user.type(screen.getByLabelText(/city/i), 'Berlin');
    await user.clear(screen.getByLabelText(/days/i));
    await user.type(screen.getByLabelText(/days/i), '2');

    const submitButton = screen.getByRole('button');

    await user.click(submitButton);

    expect(submitButton).toBeDisabled();

    resolvePromise();

    await waitFor(() => expect(submitButton).toBeEnabled());
  });

  it('should not submit when city is empty', async () => {
    const user = userEvent.setup();
    const onGenerate = vi.fn();

    render(<ItineraryGeneratorForm onGenerate={onGenerate} />);

    await user.click(screen.getByRole('button', { name: /generate-itinerary/i }));

    expect(onGenerate).not.toHaveBeenCalled();
  });

  it('should disable submit button while loading', async () => {
    const user = userEvent.setup();
    const onGenerate = vi.fn(() => new Promise(() => {}));

    render(<ItineraryGeneratorForm onGenerate={onGenerate} />);

    await user.type(screen.getByLabelText(/city/i), 'Madrid');

    const submitButton = screen.getByRole('button');
    await user.click(submitButton);

    expect(submitButton).toHaveTextContent(/generating/i);
    expect(submitButton).toBeDisabled();
  });

  it('should reset inputs when reset is called via ref', async () => {
    const user = userEvent.setup();
    const ref = createRef();

    render(<ItineraryGeneratorForm ref={ref} onGenerate={vi.fn()} />);

    const cityInput = screen.getByLabelText(/city/i);
    const daysInput = screen.getByLabelText(/days/i);

    await user.type(cityInput, 'Tokyo');
    await user.clear(daysInput);
    await user.type(daysInput, '4');

    expect(cityInput).toHaveValue('Tokyo');
    expect(daysInput).toHaveValue(4);

    ref.current.reset();

    await waitFor(() => {
      expect(cityInput).toHaveValue('');
      expect(daysInput).toHaveValue(1);
    });
  });
});
