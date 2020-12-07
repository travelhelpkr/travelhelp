import * as React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import '../scss/Modal.scss';

interface IPropsPolicy {
  isOpen: boolean,
  setModal: any
}

const Policy: React.FC<IPropsPolicy> = (props) => {

  // get policy modal
  const { isOpen, setModal } = props;

  return(
    <div className={isOpen ? 'openModal' : 'none'}>

      <div className='modalContentPolicy'>

        {/* close btn */}
        <button className='modalCloseBtn' onClick={(e: any) => {
            e.preventDefault();
            setModal(!isOpen);
          }}><CloseIcon />
        </button>
        
        {/* policy content */}
        <div>
          <strong>Policy of processing of personal information</strong><br /><br />
          <strong>Article 1 Consent to Collection of Personal Information and Collection Method</strong><br />
          Travel Help (“URL” hereinafter “Website”) shall establish a procedure for allowing customers to click the button “Agree” to the terms of use, collection of personal information, and details of personal information used. Customers shall be deemed to have agreed to the collection and use of their personal information by clicking the “Agree” button.<br /><br />
          
          <strong>Article 2 Personal Information Items Collected and Purpose of Using Personal Information</strong><br />
          “Personal Information” means information on living persons and refers to their names, resident registration numbers, or any other information that identifies such persons. (Even if such information alone cannot identify a certain person, such information that can be easily combined with other information and be used to identify such a person.)<br /><br />

          The Website has the following purposes for collecting and using customers’ personal information:<br /><br />

          Personal information of general members<br />
          - Time of collection: Signing up for membership<br />
          - Mandatory collection items: ID, password, e-mails, names *required to be revised*<br />
          - Optional collection items: Profile images, date of birth, telephone number, address *required to be revised*<br />
          - Purpose of using personal information: Signing up for membership, customer consulting for the use of services, and delivery of notices<br />
          - Retention period: Immediately deleted upon withdrawal of membership or retained for five (5) years for purchasing members<br /><br />

          Order information (including members and non-members)<br />
          - Time of collection: Upon placing orders<br />
          - Mandatory collection items: Information of customers placing orders (name, address, telephone, and e-mail), information on recipient (name, address, telephone), payment approval information<br />
          - Optional collection items: Delivery of messages<br />
          - Purpose of using personal information: Payment and delivery of ordered products<br />
          - Retention period: Retained for five (5) years<br /><br />

          <strong>Article 3 Collection of Personal Information via Cookies</strong><br />
          The Website may install and operate cookies that store and frequently retrieve customers’ information. A cookie means a small amount of text files that a website sends to users’ computer browsers (Internet Explorer, and others)<br />
          1) Purposes of using cookies<br />
          - Providing differentiated information, depending on individuals’ interests<br />
          - Analyzing the access frequency or staying time of users, identifying users’ tastes and interests, and using them for target marketing and as a measure for service improvement<br />
          - Tracing the information on items purchased and items to which users pay attention, and providing tailor-made services<br />
          2) Operation of cookies and rejection of cookiesCookies are stored at the hard disk of users’ computers. Cookies identify users’ computers but do not personally identify users.<br />
          In addition, customers may accept or reject all cookies, or go through checks whenever cookies are stored by changing settings on their web browser.<br />
          However, if customers refuse to store cookies, they may not use some services that require them.<br />
          3) Method for changing settings to reject cookies<br />
          A. Internet Explorer<br />
            Directly change settings by clicking Tools ⇒ Internet Options ⇒ Personal Information tab on the upper menu of a web browser<br />
          B. Chrome<br />
            Directly change settings by clicking Menu icon on the upper right bar of a web browser ⇒ Settings ⇒ Advanced Settings on the bottom of the screen ⇒ Contents Setting button on Personal Information section ⇒ Cookies section<br /><br />

          <strong>Article 4 Periods of Retaining and Using Personal Information and Destruction of Personal Information</strong><br />
          1) Customers’ personal information shall be destroyed without any delay after the purposes of collection and use of their personal information have been fulfilled. However, if customers’ personal information needs to be retained for a certain period of time for the following purpose of verifying transaction parties’ rights and obligations in accordance with provisions of relevant statutes, such as the Protection of Consumers in e-commerce and Other Transactions Act, such information shall be retained for the specified period:<br />
          A Article 6 of the Protection of Consumers in e-commerce and Other Transactions Act<br />
            - Records on contracts or withdrawal of offers: Retained for five (5) years<br />
            - Records on payments and the supply of goods: Retained for five (5) years<br />
            - Records on the resolution of customers’ complaints or disputes: Retained for three (3) years<br />
          B Article 15.2 of the Protection of Communication Secrets Act<br />
            - Log-in records: Retained for three (3) months<br /><br />
          C Other related statutes
          2) The Website shall destroy personal information in the following manner.<br />
          A. Destruction procedure-The information entered for membership sign-up shall be transferred to a separate database (in case of information on paper, a separate filing cabinet), stored for a certain period of time in accordance with internal guidelines and other relevant statutes, and then destroyed.<br />
            - The above personal information shall not be used for any purposes other than for the purposes stipulated by law.<br />
          B. Destruction methods-Personal information printed out on paper shall be destroyed by shredding or burning. - Personal information in electronic file format shall be entirely destroyed by technological methods so that they may not be restored or regenerated.<br />
          3) The Website shall give dormant members (who have not used services for the last twelve (12) months) a notice on the forfeiture of membership in accordance with Article 29.2 of the Act on Promotion of Information and Communications Network Utilization and Information Protection. If such members fail to reply to such a notice, they may be considered to have forfeited their membership at the Website’s discretion. In such a case, dormant members’ personal information may be stored and managed separately from other members’ personal information. Such personal information that is separated and stored shall be destroyed after the lapse of the statutory retention period. In case a customer makes a request, then such a customer’s personal information that is not destroyed shall be made available again at the time of resuming the use of services.<br /><br />

          <strong>Article 5 Provision of Personal Information for Third Parties</strong><br />
          1) The Website shall neither use customers’ personal information nor provide such information for other persons, companies, and institutions beyond the scope of Article 1 above (Personal Information Items Collected and Purpose of Using Personal Information).<br />
          2) The following cases are exceptions.<br />
          A. When customers’ personal information is required by relevant institutions for investigative purposes in accordance with relevant statutes<br />
          B. When customers’ personal information is provided in a form that cannot identify certain individuals for advertisers, suppliers, or research organizations to compile statistics or conduct academic or market research<br />
          C. When customers’ personal information is requested in accordance with pre-determined procedures under other relevant statutesEven if personal information is provided in accordance with the foregoing, we do our best to ensure that such information is not indiscriminately provided against the original purpose of collection and use of such information.<br /><br />

          <strong>Article 6 Outsourcing of Personal Information Processing</strong><br />
          The Website outsources the processing of users’ personal information to outside professional organizations as follows for the smooth conduct of businesses, such as provision of better services and customers’ convenience.<br />
          - Delivery of ordered products: OO Delivery Service *required to be revised*<br />
          - Establishing and maintaining computer systems: Hosting companies *required to be revised*<br />
          - Delivery tracking system service: Goodsflow Inc.<br />
          - Payment and escrow service: PG *required to be revised*<br />
          - Self-authentication, i-PIN service: Dream Security Inc.<br />
          ※ The information shared with outsourcing companies shall be limited to the minimum information required to fulfill the original purpose of outsourcing. In addition, optional personal information is provided for outsourcing companies at the request of customers for services.<br />
          ※ The list of outsourcing companies may be subject to change, depending on changed services and contractual periods. Any change in this list shall be announced in advance via notices. Customers participating in short-term events shall be individually notified of such events.<br /><br />

          <strong>Article 7 Access and Modification of Personal Information</strong><br />
          1) Customers may access or modify their personal information registered at the Website at any time. Customers may click the Change Members’ Information menu and directly access or modify their personal information. They may also request for such access or modification by sending e-mails or written requests to a chief privacy officer or a personal information handling employee at the Website. Then, the Website shall take relevant measures without any delay.<br />
          2) If customers demand the correction of any errors in their personal information, such personal information shall be neither used nor provided by the Website until such errors have been corrected.<br />
          3) If incorrect personal information has been already provided for any third party, then the Website shall immediately notify such third party of the result of correction of this information and have this third party also modify the information.<br /><br />

          <strong>Article 8 Withdrawal of Consent to Collection, Use, and Provision of Personal Information</strong><br />
          1) Customers may withdraw their consent to the collection, use, and provision of their personal information that is made available when signing up for membership at any time. They may do so by clicking Withdrawal of Consent (Membership) in the Personal Information Management Menu on the initial landing page of the Website. They may also do so by contacting the chief privacy officer of the Website in writing, by telephone, or through e-mail. Then, the Website shall immediately take necessary measures, such as deletion of personal information. The Website shall immediately notify customers of such measures, including withdrawal of consent and destruction of personal information.<br />
          2) The Website shall take necessary measures to ensure that customers withdraw their consent (membership) to the collection of their information through an easier method than what they used to give their consent to the method of collecting personal information.<br /><br />

          <strong>Article 9 Measures for Ensuring the Security of Personal Information</strong><br />
          The Website shall take technological/administrative/physical measures required for ensuring the security of personal information in accordance with Article 29 of the Personal Information Protection Act.<br />
          1. Encryption of personal information<br />
          Users’ personal information, including passwords, is stored and managed and is only known to the users who own that information. Important data is secured with separate features, such as the encryption and locking of files and transmitted data.<br />
          2. Technological measures against hacking<br />
          The Website shall install, regularly update, and check security porgrams to ensure that personal information is not leaked and damaged due to hacking or computer viruses. It shall also install systems in areas to which access from the outside is controlled, as well as technologically/physically inspect and block such areas.<br /><br />

          <strong>Article 10 Protection of Personal Information of Children under Fourteen Years of Age</strong><br />
          The Website deems the protection of children’s personal information in online environments to be also important. It does not allow children under fourteen years of age who require the consent of their legal counsel to apply for membership. If such childern sign up for the Website or provide their personal information due to the theft of their names and information or abuse of systems, then their legal counsels may exercise all rights.<br /><br />

          <strong>Article 11 Chief Privacy Officer</strong><br />
          The Website appoints the following chief privacy officer who is responsible for the handling of personal information and the handling of customers’ complaints regarding personal information and damage reliefs.<br /><br />

          ▶ Chief Privacy Officer<br />
          - Name: *required to be revised”<br />
          - Title: *required to be revised”<br />
          - Job grade: *required to be revised”<br />
          - Contact point: *required to be revised”<br /><br />

          <strong>Article 12 Modification of the Guideline on Personal Information Processing</strong><br />
          This guideline on personal information processing shall take effect on its effective date. Any addition of change under statutes and this guideline, and deletion and correction of anything in this guideline shall be announced via notices seven (7) days prior to the effectuation of such addition, deletion, or correction.<br />
        </div>
      </div>

    </div>
  )
}

export default Policy;