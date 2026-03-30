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
  const hidden = false;
  // render(<Onboarding hidden={false} />);
  render(<OnboardingPopup props = {hidden} />);
  expect(screen.getByText(/HEY! I HAVEN'T SEEN YOU BEFORE!/i)).toBeInTheDocument();
});

// Show the first page in onboarding
describe('First Onboarding Page', () => {
  // INITAL TESTS
  // We want to perform sanity checks to test that the UI is loading.
  test("renders onboarding popup", async () => {
    const user = userEvent.setup();
    const hidden = false; 
    render(<OnboardingPopup props = {hidden} />);
    // The exact onboarding popup text should be present in the document.
    expect(await screen.findByText(/You must be new here./i)).toBeInTheDocument();
  })

});

// SECOND PAGE TESTS

// Show the second page in onboarding
describe('Second Onboarding Page', () => {
  test("renders onboarding popup", async () => {
    const user = userEvent.setup();
    const hidden = false; 
    render(<OnboardingPopup props = {hidden} />);
    const continueButton = await screen.findByRole("button", { name: /Continue/i });
    await user.click(continueButton);

    // The exact onboarding popup text should be present in the document.
    expect(await screen.findByText(/Who are you?/i)).toBeInTheDocument();

    // Make sure the first name and last name is being requested.
    const firstName = await screen.findByLabelText(/First Name/i);
    const lastName = await screen.findByLabelText(/Last Name/i);
    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();

    //Make sure the username is being requested
    const username = await screen.findByLabelText(/Create a Username/i);
    expect(username).toBeInTheDocument();

    // Make sure the username by greeting
    const usernameGreeting = await screen.findByLabelText("Greeting by Username?");
    expect(usernameGreeting).toBeInTheDocument();

  })

});