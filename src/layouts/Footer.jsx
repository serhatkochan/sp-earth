import React from "react";
import { FormattedMessage } from "react-intl";

export default function Footer() {
  return (
    <>
        <div className="copyright">
          <FormattedMessage
            id="footer.copyright"
            defaultMessage={"Sp Earth ©2022 Mahrek Teknoloji Tarafından Üretildi"}
          />
        </div>
        <div className="version">
          <FormattedMessage id="footer.version" defaultMessage={"V *"} />
        </div>
    </>
  );
}
