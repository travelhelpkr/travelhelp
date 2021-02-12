import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Policy from '../component/Policy';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: any) => key})
}));

const IPropsPolicy = {
  isOpen: Boolean,
  setModal: Boolean
};

const setup = (props = {}) => {
  const setupProps = { ...IPropsPolicy, props };
  return render(<Policy {...setupProps} />);
};

describe('Modal close button', () => {
  it('Closes modal when close btn is clicked', () => {
    const { getByRole } = setup();
    const closeBtn = getByRole('button', { name: '' });

    fireEvent.click(closeBtn);
  });
})

describe('Content of Policy', () => {
  it('has content of privacy policy agreement', () => {
    const { getByText } = setup();
    const title = getByText('Policy of processing of personal information');
    const article1 = getByText('Article 1 Consent to Collection of Personal Information and Collection Method');
    const article2 = getByText('Article 2 Personal Information Items Collected and Purpose of Using Personal Information');
    const article3 = getByText('Article 3 Collection of Personal Information via Cookies');
    const article4 = getByText('Article 4 Periods of Retaining and Using Personal Information and Destruction of Personal Information');
    const article5 = getByText('Article 5 Provision of Personal Information for Third Parties');
    const article6 = getByText('Article 6 Outsourcing of Personal Information Processing');
    const article7 = getByText('Article 7 Access and Modification of Personal Information');
    const article8 = getByText('Article 8 Withdrawal of Consent to Collection, Use, and Provision of Personal Information');
    const article9 = getByText('Article 9 Measures for Ensuring the Security of Personal Information');
    const article10 = getByText('Article 10 Protection of Personal Information of Children under Fourteen Years of Age');
    const article11 = getByText('Article 11 Chief Privacy Officer');
    const article12 = getByText('Article 12 Modification of the Guideline on Personal Information Processing');

    expect(title).toBeInTheDocument();
    expect(article1).toBeInTheDocument();
    expect(article2).toBeInTheDocument();
    expect(article3).toBeInTheDocument();
    expect(article4).toBeInTheDocument();
    expect(article5).toBeInTheDocument();
    expect(article6).toBeInTheDocument();
    expect(article7).toBeInTheDocument();
    expect(article8).toBeInTheDocument();
    expect(article9).toBeInTheDocument();
    expect(article10).toBeInTheDocument();
    expect(article11).toBeInTheDocument();
    expect(article12).toBeInTheDocument();

  })
})