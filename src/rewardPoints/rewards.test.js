import { render, waitFor } from "@testing-library/react";
import RewardsPoints from "./index";

const mockCustomerData = {
  "customers": [
    {
      "name": "Customer 1",
      "transactions": [
        { "date": "2023-01-15", "amount": 120 },
        { "date": "2023-02-10", "amount": 80 },
        { "date": "2023-03-22", "amount": 150 }
      ]
    },
    {
      "name": "Customer 2",
      "transactions": [
        { "date": "2023-01-05", "amount": 60 },
        { "date": "2023-02-20", "amount": 90 },
        { "date": "2023-03-12", "amount": 120 }
      ]
    },
    {
        "name": "Customer 3",
        "transactions": [
          { "date": "2023-01-25", "amount": 75 },
          { "date": "2023-02-02", "amount": 90 },
          { "date": "2023-03-18", "amount": 200 }
        ]
      }
  ]
};


describe("Reward Points component", () => {
  test("test total values", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockCustomerData),
    });

    const { getByText } = render(<RewardsPoints />);
    
    await waitFor(() => {
      expect(getByText('Reward Points of Customer 1 :')).toBeInTheDocument();
      expect(getByText('Reward Points of Customer 2 :')).toBeInTheDocument();
    });

    expect(getByText('Total: 270')).toBeInTheDocument(); 
    expect(getByText('Total: 140')).toBeInTheDocument();
  });
});



