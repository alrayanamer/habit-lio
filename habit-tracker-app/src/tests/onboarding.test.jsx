// automated test suite for onboarding functionality
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import Onboarding from '../onboarding/Onboarding.jsx';
// import Onboarding from '../onboarding/Onboarding.jsx';
import OnboardingPopup from '../onboarding/OnboardingPopup.jsx';
import { AuthContext } from '../AuthContext.jsx';

// Mocks signing up on user page.
vi.mock("../auth", () => ({
  useAuth: () => ({ user: { uid: "123", email: "test@example.com" } })
}));

// Show onboarding page when user signed up for the first time.
test("shows onboarding page when user signed up for the first time", () => {
  render(<Onboarding />);
  render(<OnboardingPopup />);
  expect(screen.getByText(/Hey! I haven’t seen you before./i)).toBeInTheDocument();
});

describe('OnboardingPopup Component', () => {
  // INITAL TESTS
  // We want to perform sanity checks to test that the UI is loading.
  test("renders onboarding popup", async () => {
    const user = userEvent.setup();
    render(<OnboardingPopup />);
    // The exact onboarding popup text should be present in the document.
    expect(await screen.findByText(/You must be new here./i)).toBeInTheDocument();
  })

});