"use client";

import React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mt-4 w-11/12 md:w-1/2">
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>Terms and Conditions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <p>
              These <b>terms and conditions</b> of use (“Terms”) along with
              privacy policy (“Privacy Policy”) forms a legally binding
              agreement (“Agreement”) between You and us (
              <span className="text-red-600">ludokings.com</span>).
              <br />
              <br /> Hence, We insist that You read these Terms and Privacy
              Policy and let Us know if You have any questions regarding the
              same. We will try Our best to answer Your queries.
            </p>
            <br />
            <ol>
              <b>A. USERS’ APPROVAL</b>
              <br />
              <br />
              <p>
                1. Users approve of and accept over Agreement by:
                <br />
                (a) reading all terms and condition
                <br />
                (b) reading all rules of this app
                <br />
                <br />
                2. Users may accept this Agreement only if:
                <br />
                (a) Such User is a natural person, is of the legal age (18 years
                or older), eligibility and mental capacity to form a binding
                contract with us.
                <br />
                (b) Such User is a not a resident of Tamil Nadu, Andhra Pradesh,
                Telangana, Assam, Orissa, Sikkim, Nagaland.
                <br />
                (c) Such User is a juristic person, is lawfully existing, and
                has all the authorizations, permits, and allowances to enter
                into this Agreement and form a binding contract.
                <br />
                (d) Such User is not legally barred or restricted from using the
                App.
                <br />
                <br />
                3. You understand that We want You to not use the App if You do
                not understand, approve of or accept all the terms specified in
                this Agreement. Hence, You are requested to read these Terms and
                Privacy Policy carefully and understand the Agreement before You
                accept it and agree to be bound by it.
                <br />
                <br />
                4. The Agreement shall govern the relationship of each User with
                us. However, We may also execute separate written agreements
                with its Users. In case of conflict between terms of such
                separate written agreement and this Agreement, the terms of the
                separate written agreement shall prevail.
              </p>
              <br />
              <b>B. PROVISION OF THE APP</b>
              <br />
              <br />
              <p>
                1. Section 12 of the Public Gambling Act, 1867 provides that
                games of mere skill are exempt from the application of the Act.
                The Supreme Court of India and various High Courts in India have
                opined that a game of mere skill is a game “in which, although
                the element of chance necessarily cannot be entirely eliminated,
                success depends principally upon the superior knowledge,
                training, attention, experience and adroitness of the player. A
                game of skill is one in which the element of skill predominates
                over the element of chance.” No penalty can be imposed upon a
                person for playing such games of skill.
                <br />
                <br />
                2. Users must note that ‘Ludo’ game available for challenge in
                our platform is ‘Games of Skill’, under Indian law, and that we
                does not support, endorse or offer to Users ‘games of chance’
                for money. While ‘Games of Skill’ do not have a comprehensive
                definition, they are those games where the impact of a player’s
                effort and skill on the outcome of a game is higher than the
                impact of luck and chance.
                <br />
                <br />
                3. It may be noted that States are permitted, by the Indian
                Constitution, to enact laws regulating betting and gambling in
                their respective jurisdictions. In furtherance of these powers,
                various States have enacted anti- gambling legislations. Such
                legislations are largely in concert with the Public Gambling Act
                of 1867 (and include the exception of “games of skill”). Where a
                State legislation on gambling exists, it prevails over the
                Public Gambling Act of 1867. In this regard, the Assam Game and
                Betting Act, 1970 and Orissa (Prevention of) Gambling Act, 1955
                and Telangana State Gaming (Amendment) Ordinance and High Court
                Judgment in Gujarat, 2017 prohibits games with money stakes and
                also does not create an exception for games of skill. Therefore,
                currently, residents of Assam, Odisha, Telangana and Gujarat are
                not permitted to play on our site.
                <br />
                <br />
                4. The games rules are clearly defined on this platform and
                Users are encouraged to read, understand and follow these rules
                to be successful in these games.
                <br />
                <br />
                5. The games on our platform are ‘Games of Skills’, such that
                the outcome / success in the games is directly dependent on the
                User’s effort, performance and skill. By choosing how to play,
                the actions of Users shall have direct impact on the game.
                <br />
                <br />
                6. Every game will have some elements of chance, but in the form
                of challenges / obstacles that a User would be able to overcome
                using his/her skills and knowledge of the game. Elements of luck
                are present in every game to add thrill and excitement, but no
                two attempts at a game are identical so Users must use their
                skills in order to be successful
                <br />
                <br />
                7. Since the games available on our platform can be won through
                Users’ skills and such skills may be enhanced with practice and
                experience, the performance of a User may improve with time and
                practice.
                <br />
                <br />
                8. Certain games may have pre-determined outcomes (Ludo), and
                these outcomes are achievable by Users using their skills.
                <br />
              </p>
              <br />
              <b>C. GAME RULES</b>
              <br />
              <br />
              <p>
                1. Player who sets a challenge will share a room id/room code
                with his/her opponent.
                <br />
                <br />
                2. On winning both players have to update there results in
                following manner:
                <br />
                (a) if you have won, select ‘I Won’ option and upload winning
                screenshot of the game.
                <br />
                (b) if you have lost, select ‘I Lost’ option.
                <br />
                (c) if match is not started and both parties doesn&apos;t want
                to play, select ‘Cancel’ option.
                <br />
                <br />
                3. User must have to record every game, and if any player is
                hacking or cheating a game, contact support.
                <br />
                <br />
                4. If game is not started, if you haven&apos;t played a single
                move yourself, please show the recording of game to support.
                Game will be cancelled only if you have recording.
                <br />
                <br />
                5. If you don&apos;t have any proof against player cheating and
                error in game, you will be considered as lost.
                <br />
                <br />
                6. If you have not moved a single pawn or no pawn is open at
                home, your game will be cancelled.
                <br />
                <br />
                7. If your opponent leaves match purposely in starting or
                initial game, and opponent doesn&apos;t have any valid proof for
                cancellation, you will be awarded win.
              </p>
              <br />
              <b>D. DEPOSIT / WITHDRAWAL</b>
              <br />
              <br />
              <p>
                1. Players can deposit their balance in{" "}
                <a href="/wallet" alt="Buy Chips" className="font-bold">
                  Buy Chips
                </a>{" "}
                section.
                <br />
                <br />
                Important:- If we detect any type of suspecious
                transaction/activity in your account, in such cases we have
                rights to Block your account temporarily. Kindly contact Admins
                in such cases and provided the needed details to Un-block your
                account.
                <br />
                <br />
                2. Player can take withdrawal by setting a Sell Request on your
                app.
                <br />
                <br />
                3. Deposit and withdrawal requests are completed by support at
                any time.
                <br />
                <br />
                4. Any wrong payment detail given by you, will not be considered
                in refund.
                <br />
                <br />
                5. Once a withdrawal is done, you don&apos;t have any authority
                to raise any query.
                <br />
                <br />
                6. If withdrawal request go on pending, user must have to wait
                for 1-5 days.
              </p>
              <br />
              <b>E. PENALITY FOR WRONG UPDATES</b>
              <br />
              <br />
              <p>
                1. If you put the wrong update on any match, you will be charged
                penality of:
                <br />
                (a) if your game is below 1000, penalty will be 10%.
                <br />
                (b) if your game is above 1000 and below 5000, penality will be
                50 flat.
                <br />
                (c) if your game is above 5000 and below 15000, penality will be
                100 flat.
                <br />
                <br />
                2. If you don&apos;t update result after losing, you will be
                charged penality of 25 flat.
                <br />
                <br />
                3. Players can have only single account in case multiple
                accounts found, We have authority to ban those account
                permanently & add penalty
              </p>
              <br />
              <b>F. COMMISSION CHARGES</b>
              <br />
              <br />
              <p>
                1. Net 3% commission (after referral money deduction) will be
                charged on challenge amount.
              </p>
            </ol>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography>Cancellation & Refund Policy</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <b>Refund Policy</b>
            <br />
            <br />
            <p>
              Thanks for being connected with Ludo Kings. If you are not
              entirely satisfied with your subscription, we are here to help.
            </p>
            <br />
            <b>Refunds Process</b>
            <br />
            <br />
            <p>
              Once we receive your Refund request, we will inspect it and notify
              you on the status of your refund.
              <br />
              <br />
              If your refund request is approved, we will initiate a refund to
              your credit card (or original method of payment) within 7 working
              days. You will receive the credit within a certain amount of days,
              depending on your card issuer&apos;s policies.
              <br />
              <br />
              In case of unforeseen technical glitch,{" "}
              <span className="text-red-600">Ludo Kings</span> would refund
              subscription upon reviewing the complaint. Final decision lies
              with the company.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <Typography>Privacy Policy</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <b>Introduction</b>
            <br />
            <br />
            <p>
              This document explains how{" "}
              <span className="text-red-600">Ludo Kings</span>{" "}
              (https://ludokings.com) collects, processes, stores and/or shares
              any personal data and/or information from users (jointly referred
              to as “Information”). By accessing and/or using the Services you
              consent the collection, transfer, manipulation, storage,
              disclosure and other uses of your information as described in this
              Privacy Policy. If you have any concerns about providing data, or
              having it used in any manner permitted in this Privacy Policy, you
              should not use the Services. As set out in the terms and
              conditions relating the Services (the “Terms”), you must be at
              least at legal age <b>(minimum age of 18 years)</b> to access
              and/or use the Services, or if legally possible, to access with
              your legal guardian consent, due authorization and agreement with
              these Privacy Policy.
            </p>
            <br />
            <b>The Information collected:</b>
            <br />
            <br />
            <p>
              <b className="text-red-400">Ludo Kings</b> and/or third parties,
              including but not limited to business partners, advertising
              networks, analytics or search information providers, may collect
              and process the following data about you: information that you
              provide when you fill in forms when accessing and/or using the
              Services, or when you create an account within the Services;
              details of your use of the Services and the resources that you
              access; the correspondence between you and Ludo Kings and any
              interactions, or with other users on the Service, the channels
              and/or any social media related; from third parties who hold data
              about you and who agree to share this data with us; and
              information collected via cookies and other similar technologies
              and/or other mechanisms, as explained further below.
              <br />
              <br />
              <b>Personal Data:</b> While using Our Service, We may ask You to
              provide Us with certain personally identifiable information that
              can be used to contact or identify You. Personally identifiable
              information may include, but is not limited to:
            </p>
            <ul>
              <li>
                <b> * Email address</b>
              </li>
              <li>
                <b> * First name and last name</b>
              </li>
              <li>
                <b> * Phone Number</b>
              </li>
              <li>
                <b> * Address, State, Province, ZIP/Postal code, City</b>
              </li>
            </ul>
            <br />
            <ol>
              <li>
                1. Cookies: <b>Ludo Kings</b> uses cookies and other similar
                technologies in the Services. These technologies operate either
                by placing a small file which stores some information on your
                computer or mobile device; and/or by accessing information on
                your device. Ludo Kings uses cookies and similar technologies to
                recognize you and your device, for example by identifying your
                IP address; to allow the Services to interact with a third party
                social network or platform where you have chosen to allow such
                interaction; to allow payment processes when you submit payment
                instructions; to enable Ludo Kings and third parties to provide
                you with more customized services; and to collect data such as
                your device’s model, operating system and screen size, other
                applications installed on your device, and information about how
                you use the Services. By accessing and/or using the Services you
                consent the use of cookies and similar technologies in
                accordance with this Privacy Policy. You can disable cookies
                through your web or mobile device browser settings but some
                features of the Services may not function properly.
                Alternatively, if you do not wish such data collection as
                described in this section, you should stop using the Services.
              </li>
              <br />
              <li>
                2. Ads: Advertisers on mobile devices sometimes use advertising
                identifiers to enable and optimize their advertising, to deliver
                tailor ads related to your interests (Interest-Based Advertising
                or IBA). These identifiers are non-permanent, non-personal,
                device identifiers. Ludo Kings and/or third parties may use your
                device’s advertising identifier and other information associated
                with it, to deliver ads that relate to your interests and to
                improve and measure the effectiveness of ad campaigns.
              </li>
              <br />
              <li>
                3. Location Information: You may choose to publish your location
                in your Ludo Kings profile. You may also tell your location when
                you enable your device to send such location information. Ludo
                Kings and/or third parties may use and store information about
                your location to provide special features, to deliver ads that
                relate your interests and/or to improve and customize the
                Services.
              </li>
              <br />
              <li>
                4. Links: Ludo Kings may keep track of how you interact with
                links across the Services, including email notifications,
                third-party services, and client applications, by redirecting
                clicks or through other means.
              </li>
              <br />
              <li>
                5. Log Data: Servers automatically record information created by
                your use of the Services. This data may include information such
                as your IP address, browser type, operating system, the
                referring web page, pages visited, location, your mobile
                carrier, device and application IDs, search terms, and cookie
                information. Log data is received when you interact with the
                Services. This data is used to provide the Services and to
                measure, customize, and improve them.
              </li>
              <br />
              <li>
                6. Payment information: If you make a purchase in the Services,
                Ludo Kings may collect the billing and financial information
                necessary to process the charges; and/or do so on behalf of the
                relevant payment service providers. Purchases of third party
                services are subject to the policies applicable to such
                provider.
              </li>
              <br />
              <li>
                7. Third-party services: Ludo Kings uses a variety of
                third-party services to help its provision of the Services, such
                as hosting and other services. These third-party service
                providers may collect information sent by your browser as part
                of a web page request, such as cookies or your IP address,
                location and devices’ unique identifiers. Also, third-party ad
                partners may share information to measure ad quality and tailor
                ads, for example to display ads about things you may have
                already shown interest in.
              </li>
              <br />
              <li>
                8. Customer Support Correspondence: When you ask for assistance
                from Ludo Kings customer support, the contact information you
                provide will be collected, as well as information about your
                game play or activity on the Service, your user ID number, and
                the correspondence and any information contained within. If
                available through the Services, you may provide Ludo Kings with
                profile information to make public, such as a short biography,
                location, website, cell phone, a picture, information to
                customize your account, etc. Such contact information may be
                used to send you information about the Services or related
                information. You may use your account settings to unsubscribe
                from notifications from Ludo Kings and/or from other users and
                find users you know. You may also unsubscribe by following the
                instructions contained within the notification or the
                instructions on the Service. Also Ludo Kings may use your
                contact information to help others find your account, including
                through third-party services and client applications. Providing
                any additional information described in this section is entirely
                optional.
              </li>
            </ol>
            <br />
            <b>Use of Information</b>
            <br />
            <br />
            <p>
              When you create or configure an account in the Services, you
              provide some personal information, such as your name, username,
              password, email address and any other information as required time
              to time. Some of this information, for example, your name and/or
              username, may be listed publicly on the Services, including on
              your profile page and in search results. You agree that Ludo
              Players and/or third parties on its behalf and/or its partners may
              use the Information for the purposes of contacting you as part of
              customer support; to send you updates or information about the
              Services; managing your account and relationship with the Service
              and improving your experience when you use it, improving the
              Services, research, surveying, and engaging with you, for example
              by sending you communications for these purposes; marketing and
              promotion of the Services or products; to personalize and optimize
              the Services, promotional content and/or advertising; to create
              reports, analysis or similar services for the purposes of research
              or business intelligence.
            </p>
            <br />
            <b>Information sharing and disclosure</b>
            <br />
            <br />
            <p>
              Ludo Kings will only share your data with third parties according
              to the Privacy Policy, as reasonably necessary in order to provide
              the Services, for example, by providing Information to suppliers
              that Ludo Kings may use to fulfill the Services; where it is
              necessary to carry out your instructions, for example, to process
              a payment instruction your Information has to be provided to the
              payment processors; where your data is on an anonymous and
              aggregated basis, meaning you could not be personally identified
              from it; for the delivery of Interest-Based Advertising in the
              manner set out on this Privacy Policy; when you submit information
              as part of a competition or otherwise interact with any channel or
              social media, the information you submitted may be published; as
              it`s reasonably believed is permitted by law or regulation; in
              order to comply with any legal obligation, or in order to enforce
              or apply the Terms, this Privacy Policy and/or any other agreement
              with you; or to protect the rights and/or property of Ludo Kings
              or third-party´s rights and/or property. Ludo Kings may share or
              disclose your non-private information, such as public user profile
              information, public messages, e-mail, etc., or share or disclose
              your information in an anonymous or aggregated basis in a manner
              that does not allow your personal identification.
            </p>
            <br />
            <b>Interaction with social networks and/or platforms</b>
            <br />
            <br />
            <p>
              You may allow the Services to interact with any third party social
              network and/or platforms, such as Facebook, twitter, whatsApp and
              any other networks/platforms which will provide data about you to
              Ludo Kings. Since any other applications or websites different
              than the Services are owned by a third party, you must ensure that
              you read their terms of service and the applicable privacy
              policies. You understand that when you allow the Services to
              interact with any third party social network and/or platform, Ludo
              Players may share data about you with your contacts and other
              users of the Services and vice versa. This Data may include your
              name, profile picture, activity status, and information related to
              your use of the Services. You can change this by adjusting your
              settings with that third party provider. Ludo Kings has certain
              links embedded to third party services including but not limited
              to YouTube. Your interaction with such third party platform/s are
              governed by their policies, and we urge you to review their
              policies before you proceed with availing such services via the
              offerings of Ludo Kings. The YouTute terms are available at{" "}
              <a
                href="https://www.youtube.com/t/terms"
                alt="terms"
                className="text-blue-400"
              >
                https://www.youtube.com/t/terms
              </a>{" "}
              and the Google Privacy Policy is available at
              https://policies.google.com/privacy?hl=en-US. Also, to control
              your interaction with Google account or their services allows you
              to control your rights and activities, and may be accessed at
              <a
                href="https://myaccount.google.com/permissions"
                alt="myaccount.google.com/permissions"
              >
                myaccount.google.com/permissions
              </a>
              .
            </p>
            <br />
            <b>Term</b>
            <br />
            <br />
            <p>
              Ludo Kings may retain the Information for as long as is necessary
              to fulfill the purposes for which it was collected or as needed to
              provide the Services, even after you have discontinued or deleted
              any account, or after the end of the provision of the Services, if
              retention of such Information is reasonably necessary to comply
              with legal obligations, meet regulatory requirements, resolve
              disputes between users, prevent fraud, or any other use.
            </p>
            <br />
            <b>Protection of Information</b>
            <br />
            <br />
            <p>
              Ludo Kings maintains appropriate technical and physical safeguards
              to protect Information against accidental or unlawful destruction
              or loss, alteration, unauthorized disclosures or access, and any
              other unlawful forms of processing of the data in its possession.
              However, Ludo Kings does not guarantee that Information will not
              be accessed, disclosed, altered or destroyed by breach of any of
              the abovementioned safeguards. Information may be transferred to
              and/or stored at worldwide destinations. Ludo Players takes all
              steps reasonably necessary to ensure that Information is treated
              securely and in accordance with this Privacy Policy. In the event
              that Ludo Kings is involved in a bankruptcy, merger, acquisition,
              reorganization or sale of assets, your information may be sold or
              transferred as part of that transaction. The undertakings in this
              Privacy Policy shall apply to the Information as transferred to
              the new entity.
              <br />
              <br />
              In the Services you may find links to third party websites. You
              understand that when you click on these links any data which you
              provide afterwards is subject to that third party&apos;s privacy
              policy and not to Ludo Kings’s. Consequently, Ludo Kings takes no
              responsibility for the content, safety or security of any third
              party website. The Services are not directed to persons under
              legal age. Ludo Kings does not knowingly collect any Information
              from children under legal age. If you become aware that a child
              under legal age has provided with personal information, steps will
              be taken to remove such information and terminate such account. If
              you become aware that any child has provided personal information
              without the essential legal guardian consent, please contact:
              <b className="text-red-600">support@ludokings.com</b>.
              Irrespective of which country you reside in or supply information
              from, you authorize Ludo Kings to store and/or use the Information
              according to this Privacy Policy in any country where Ludo Kings
              may operate.
              <br />
              <br /> Not with standing anything to the contrary in this Policy,{" "}
              <b>Ludo Kings</b> may preserve or disclose your information to the
              extent reasonably necessary to comply with a law, regulation or
              legal request; to protect the safety of any person; to address
              fraud, security or technical issues; or to protect Ludo
              Players&apos;s rights or property. However, nothing in this
              Privacy Policy is intended to limit any legal defenses or
              objections that you may have to a third party’s, including a
              government’s request to disclose your information. We wants to
              make sure that your Information is accurate and up to date. You
              may ask to modify, correct or remove information with the tools
              and account settings of the Service, or otherwise by contacting
              Ludo Kings at support@ludokings.com.
              <br />
              <br /> If any court or other competent authority finds any of this{" "}
              <b>Privacy Policy</b> to be invalid or unenforceable, the other
              terms of this Privacy Policy will not be affected. This Privacy
              Policy is governed by and interpreted in accordance with the laws
              of Nagaland State Government as well as Republic of India. Any
              dispute arising in connection with this Privacy Policy will be
              subject to the exclusive jurisdiction of the courts located in the
              city of Jaipur/Rajasthan – India. You consent the jurisdiction and
              venue in such courts and waive any objection as to inconvenient
              forum Ludo Kings may revise or amend this Privacy Policy from time
              to time.
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
            <Typography>About Us</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <p>
              <b>Ludo Kings</b> (&quot;or We&quot;) is a real-money online
              gaming product owned and operated by Allinone Hax.
              <br />
              <br />
              We are an HTML5 game-publishing company and our mission is to make
              accessing games fast and easy by removing the friction of
              app-installs.
              <br />
              <br />
              Ludo Kings is a skill-based real-money gaming platform accessible
              only for our users in India. It is accessible on
              <span className="text-red-600"> https://ludokings.com</span>.
              <br />
              <br /> On Ludo Kings, users can compete for real cash in
              Tournaments and Battles. They can encash their winnings via
              popular options such as Paytm Wallet, UPI or Phonepe.
            </p>
            <br />
            <b className="text-xl">Our Games</b>
            <br />
            <br />
            <p>
              We have a wide-variety of high-quality, premium HTML5 games,
              online games. Our games are especially compressed and optimised to
              work on low-end devices, uncommon browsers, and patchy internet
              speeds.
              <br />
              <br />
              We have games across several popular categories: Arcade, Action,
              Adventure, Sports & Racing, Strategy, Puzzle & Logic. We also have
              a strong portfolio of multiplayer games such as Ludo, Chess, 8
              Ball Pool, Carrom, Ludo Tournament Tic Tac Toe, Archery, Quiz,
              Chinese Checkers and more! Some of our popular titles are: Escape
              Run, Bubble Wipeout, Tower Twist, Cricket Gunda, Ludo With
              Friends. If you have any suggestions around new games that we
              should add or if you are a game developer yourself and want to
              work with us, don&apos;t hesitate to contact us on
              <span className="text-red-600"> support@ludokings.com</span>
            </p>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
        >
          <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
            <Typography>Contact Us</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <p>support@ludokings.com</p>
            <br />
            <p>www.ludokings.com</p>
            <br />{" "}
            <a href="/support" className="text-blue-600">
              Contact us
            </a>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
