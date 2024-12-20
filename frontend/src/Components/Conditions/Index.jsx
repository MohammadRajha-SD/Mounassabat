import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Index.jsx';
import NavBar from '../Navbar/NavBar.jsx';

const Index = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-full h-[100vh]"><Loader /></div>
      ) : (
        <>
          <NavBar />

          <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-8">
            <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
              <h1 className="text-4xl font-bold text-center mb-6" style={{ color: "#e6cf8c" }}>
                Traitement des données personnelles
              </h1>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  Introduction
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Lorsque vous utilisez les services proposés par la Société, vous acceptez que vos données personnelles soient transmises à l’entité suivante : La société Harmonassaba SARL de droit Marocain immatriculée au Registre du Commerce de Casablanca sous le numéro 598939 et dont le siège social est situé au 7éme Etage Apt N16, Et Moussa Bnou Noussair, 174 Bd Mohammed Zerktouni, Casablanca 20250. Casablanca.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  Utilisation des données personnelles
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  L'objectif de la collecte de données personnelles est de vous garantir une expérience sûre, optimale, efficace et personnalisée. Vous acceptez que nous puissions utiliser vos données personnelles pour vous offrir un service client, résoudre les litiges, percevoir des frais, empêcher des activités illégales, et personnaliser nos services et communications.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  Partage de vos données
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  La Société peut divulguer vos données personnelles pour satisfaire à des obligations légales, répondre à des réclamations, ou protéger les droits et la sécurité de quiconque. Les données peuvent également être partagées avec des sociétés affiliées ou prestataires sous contrat.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  Droit d'accès et de rectification
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Conformément à la loi 09-08, vous disposez d’un droit d’accès, de rectification, et d’opposition des données personnelles. Pour exercer ce droit, contactez-nous à{" "}
                  <a href="mailto:monassabatmaroc@gmail.com" className="text-blue-500 underline">
                    monassabatmaroc@gmail.com
                  </a>.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  Traitement des données lors d’un paiement
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  En utilisant le service de paiement en ligne, les données telles que nom, courriel, adresse, et numéro de téléphone peuvent être transmises à VPS pour gérer l’opération de paiement. Les données bancaires confidentielles sont protégées et ne sont pas utilisées à des fins de prospection.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  Propriétés Intellectuelles
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Tous les éléments du site (textes, graphismes, images, vidéos) sont protégés par les droits d'auteur et ne peuvent être reproduits sans autorisation. L’utilisation non autorisée engage la responsabilité civile et/ou pénale de l’utilisateur.
                </p>
              </section>

              {/* Section: Intellectual Property */}
              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  Propriétés Intellectuelles
                </h2>
                <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
                  <li>
                    L’ensemble des éléments constituant le site, y compris textes, documents, images, vidéos, et graphismes, relèvent de la législation marocaine et internationale.
                  </li>
                  <li>
                    Tous les droits de propriété intellectuelle, y compris les droits d'auteur et les marques déposées, appartiennent à Harmonassaba Sarl ou sont utilisés avec l'accord des titulaires des droits.
                  </li>
                  <li>
                    Toute reproduction, modification, ou distribution sans autorisation préalable est interdite et peut entraîner des poursuites judiciaires.
                  </li>
                  <li>
                    Vos informations personnelles sont utilisées conformément à la loi 09-08 pour traiter vos demandes et assurer une expérience optimisée.
                  </li>
                  <li>
                    Mounassabat.ma se réserve le droit de retirer tout contenu jugé non conforme à la réglementation ou aux conditions générales d'utilisation.
                  </li>
                </ul>
              </section>

              {/* Section: Rules for Announcements */}
              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  Règles de publication d'annonce
                </h2>
                <p className="text-gray-700 mb-4">
                  Les règles suivantes doivent être respectées pour que vos annonces soient publiées sur Mounassabat.ma :
                </p>
                <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
                  <li>
                    Les annonces doivent respecter les réglementations et les bonnes mœurs. Toute annonce contraire sera refusée ou supprimée.
                  </li>
                  <li>
                    Une annonce ne peut être publiée dans plusieurs catégories ou régions pour un même service.
                  </li>
                  <li>
                    Les annonces doivent être en relation directe avec le domaine de l’évènementiel.
                  </li>
                  <li>
                    Annonces de particuliers : réservées aux personnes non commerciales souhaitant travailler avec des prestataires de service.
                  </li>
                </ul>
                <div className="mt-4">
                  <p className="text-gray-700">
                    <strong>Note 1:</strong> La durée de vie d’une annonce est limitée sauf pour les utilisateurs ayant acheté des packs.
                  </p>
                  <p className="text-gray-700">
                    <strong>Note 2:</strong> Le nombre d’annonces gratuites est limité. Pour plus de détails, consultez{" "}
                    <a href="https://aide.mounassabat.ma/le-nombre-dannonces-gratuites/" className="text-blue-500 underline">
                      cet article
                    </a>.
                  </p>
                </div>
              </section>

              {/* Section: Marketing and Duplication */}
              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  Doublons et Marketing
                </h2>
                <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
                  <li>
                    Il est interdit de publier plusieurs annonces pour un même service sans respecter un délai de 7 jours entre les publications.
                  </li>
                  <li>
                    Les annonces ne doivent pas être utilisées à des fins de marketing sans l'approbation explicite de Mounassabat.ma.
                  </li>
                </ul>
              </section>

              {/* Section: Professional Announcements */}
              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  Annonce de Professionnel
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Les annonces catégorisées comme "Professionnel" publiées sur Mounassabat.ma sont réservées aux entreprises et ceux travaillant dans le domaine de l’évènementiel. Mounassabat.ma se réserve le droit de juger le caractère professionnel et sérieux d'une annonce.
                </p>
              </section>

              {/* Section: Rules for Announcements */}
              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  Règles pour les annonces
                </h2>
                <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
                  <li>
                    <strong>Services:</strong> Les services proposés doivent respecter les lois en vigueur au Maroc.
                  </li>
                  <li>
                    <strong>Titre de l'annonce:</strong> Doit décrire le service proposé sans contenir de numéros de téléphone, termes comme "Urgent", URL, ou liens vers des réseaux sociaux. Mounassabat.ma se réserve le droit de modifier les titres non conformes.
                  </li>
                  <li>
                    <strong>Texte de l'annonce:</strong> Doit être clair et unique. Le copier-coller de contenu est strictement interdit.
                  </li>
                  <li>
                    <strong>Langue:</strong> Les annonces doivent être rédigées en Français ou en Arabe.
                  </li>
                  <li>
                    <strong>Catégories:</strong> Les annonces doivent être classées correctement sous "Offre" ou "Demande". Une annonce mal classée peut être modifiée ou supprimée.
                  </li>
                </ul>
              </section>

              {/* Section: General Terms */}
              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  Conditions Générales d'Utilisation
                </h2>
                <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
                  <li>
                    <strong>Acceptation:</strong> En utilisant ce site, vous acceptez les présentes conditions générales.
                  </li>
                  <li>
                    <strong>Déclarations:</strong> Les annonceurs garantissent que leurs annonces respectent les lois en vigueur et ne violent aucun droit d'auteur ou propriété intellectuelle.
                  </li>
                  <li>
                    <strong>Responsabilités:</strong> Les utilisateurs sont responsables de tout dommage causé à des tiers ou à la Société via l'utilisation du site.
                  </li>
                  <li>
                    <strong>Liens externes:</strong> Mounassabat.ma n'est pas responsable du contenu des sites tiers accessibles via des liens.
                  </li>
                  <li>
                    <strong>Copyright:</strong> Le contenu des annonces appartient aux annonceurs, mais Mounassabat.ma dispose de droits non exclusifs pour l'utilisation des contenus.
                  </li>
                </ul>
              </section>

              {/* Section: Security and Access */}
              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  Sécurité et Accès
                </h2>
                <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
                  <li>
                    Toutes les images téléchargées sont filigranées pour éviter une utilisation abusive.
                  </li>
                  <li>
                    L'accès aux sections réservées nécessite un identifiant et un mot de passe. Les utilisateurs sont responsables de leur confidentialité.
                  </li>
                  <li>
                    Mounassabat.ma peut interrompre ou limiter l'accès à ses services sans préavis pour maintenance ou autres raisons.
                  </li>
                </ul>
              </section>

              {/* Section: Identifiants et Mots de passe */}
              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  Identifiant et Mot de Passe
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Les identifiants et mots de passe sont confidentiels. Les utilisateurs doivent prendre toutes les précautions pour les protéger. Mounassabat.ma met en œuvre des moyens pour assurer la sécurité des données transmises.
                </p>
              </section>

              {/* Section: Respect de la vie privée */}
              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  10- Respect de la vie privée
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  La Société utilise vos informations uniquement dans le cadre prévu par la loi marocaine et dans le respect absolu de la vie privée ainsi que dans un cadre strictement professionnel. Vos informations sont stockées sur des ordinateurs sécurisés au Maroc et protégées par des méthodes de sécurité physiques et technologiques.
                </p>
                <p className="text-gray-700 leading-relaxed mt-2">
                  Vous pouvez consulter et modifier les informations que vous fournissez, et choisir de ne pas recevoir certains types de communications lors de l'ouverture de votre compte ou à tout autre moment. Nous utilisons des tiers pour vérifier et certifier nos principes de respect de la vie privée.
                </p>
              </section>

              {/* Section: Traitement des données */}
              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  11- Le traitement des données
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Lorsque vous utilisez les services proposés par la Société, vous acceptez que vos données personnelles soient transmises à l’entité suivante :
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700 leading-relaxed">
                  <li>
                    La société <strong>HARMONASSABA SARL</strong> de droit marocain immatriculée au Registre du Commerce de Casablanca sous le numéro 598939 et dont le siège social est situé au 174 BD Zerktouni et Rue Moussa Ibnou Noussair, 7ème étage, Casablanca.
                  </li>
                </ul>
              </section>

              {/* Section: Collecte des données personnelles */}
              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  12- Collecte des données personnelles
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Vous pouvez naviguer sur Mounassabat.ma sans avoir à décliner votre identité. Lorsque vous communiquez vos informations personnelles, vous acceptez leur transfert et stockage sur nos serveurs situés au Maroc ou ailleurs. Nous collectons les informations suivantes :
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700 leading-relaxed">
                  <li>Nom, adresse e-mail, ville et quartier, numéros de téléphone.</li>
                  <li>Coordonnées physiques, URL de site web, date de naissance.</li>
                  <li>Informations financières comme numéros de carte bancaire.</li>
                  <li>Activités sur le site (logos, descriptions, photos).</li>
                  <li>Informations relatives à votre interaction avec nos services.</li>
                </ul>
              </section>

              {/* Section: Marketing */}
              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  13- Marketing
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  La Société ne vend ni ne loue vos données personnelles à des tiers à des fins de marketing sans votre consentement formel. Nous combinons vos données avec d’autres sources pour améliorer nos services.
                </p>
              </section>

              {/* Section: Utilisation des données personnelles */}
              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  14- Utilisation des données personnelles
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  L'objectif principal de la collecte de données personnelles est de vous offrir une expérience sûre, optimale et personnalisée. Vos données sont utilisées pour :
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700 leading-relaxed">
                  <li>Fournir des services et assurer le service client.</li>
                  <li>Résoudre des litiges et détecter des activités interdites.</li>
                  <li>Personnaliser, évaluer et améliorer nos services et contenus.</li>
                  <li>Vous tenir informé des mises à jour et offres promotionnelles.</li>
                </ul>
              </section>

              {/* Section: Partage de vos données */}
              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  15- Partage de vos données
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  La Société peut divulguer vos données personnelles pour répondre à des obligations légales, faire appliquer les conditions générales, ou protéger les droits de quiconque. Les données peuvent également être partagées avec :
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700 leading-relaxed">
                  <li>Sociétés affiliées pour fournir des services communs.</li>
                  <li>Prestataires sous contrat pour des opérations comme la détection des fraudes.</li>
                  <li>Autorités judiciaires ou administratives en cas d’enquête.</li>
                </ul>
              </section>

              {/* Section: Informations partagées sur Mounassabat */}
              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  16- Informations que vous partagez sur Mounassabat.ma
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Vos identifiants et le nom de votre boutique en ligne sont visibles sur le site. Si vous utilisez un ordinateur partagé, vos données peuvent être accessibles par d'autres utilisateurs. Veillez à vous déconnecter et supprimer vos cookies après usage.
                </p>
              </section>
              {/* Sections: 17-27 */}
              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  17- Utilisation d'informations Mounassabat
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  La Société vous permet de communiquer des informations personnelles et financières pour effectuer des transactions. Nous vous encourageons à respecter la vie privée des autres utilisateurs et à évaluer leurs politiques de confidentialité avant d'entamer une transaction.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  18- Cookies
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Nous utilisons des cookies pour personnaliser nos services, mesurer l’efficacité promotionnelle, et promouvoir la sécurité. Vous pouvez refuser nos cookies via les paramètres de votre navigateur, mais certaines fonctionnalités risquent de ne pas être accessibles.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  19- Protection de compte
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Votre mot de passe est la clé d'accès à votre compte. Utilisez un mot de passe sécurisé et ne le partagez pas. Si vous perdez le contrôle de votre mot de passe, modifiez-le immédiatement et informez la Société.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  20- Droit d'accès et de rectification de vos données personnelles
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Conformément à la loi 09-08, vous disposez d’un droit d’accès, de rectification et d’opposition concernant vos données. Vous pouvez exercer ce droit en envoyant un email à{" "}
                  <a href="mailto:monassabatmaroc@gmail.com" className="text-blue-500 underline">
                    monassabatmaroc@gmail.com
                  </a>.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  21- Sécurité
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Vos données sont stockées sur des serveurs sécurisés. Malgré nos efforts, nous ne pouvons pas garantir une protection absolue contre des accès ou divulgations non autorisés.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  22- Tiers
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Si vous communiquez vos données à d'autres parties, leurs politiques de confidentialité peuvent s'appliquer. La Société ne contrôle pas ces politiques et vous encourage à poser des questions avant de partager vos données.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  23- Indemnisation
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Les utilisateurs s'engagent à indemniser Mounassabat.ma/la Société contre toutes les réclamations, pertes ou coûts découlant d'une violation des conditions générales ou d'un comportement négligent.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  24- Modification
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Mounassabat.ma/la Société se réserve le droit de modifier les conditions générales d’utilisation à tout moment. Ces modifications entreront en vigueur immédiatement après leur publication.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  25- Références légales
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Les utilisateurs et la Société sont soumis au droit marocain, notamment les lois n° 53-05, 09-08, et 31-08, entre autres dispositions légales applicables.
                </p>
              </section>

              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  26- Mentions légales relatives à la société
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Société à responsabilité limitée de droit marocain au capital social de 100 000,00 MAD, immatriculée au registre du commerce de Casablanca sous le numéro 598939.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  27- Juridictions compétentes
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Tout litige ou réclamation afférent à l'utilisation du site sera de la compétence exclusive du tribunal du domicile de la partie demanderesse.
                </p>
              </section>
              {/* Section: Interdictions Générales */}
              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  Interdictions Générales
                </h2>
                <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
                  <li>
                    Toute annonce contenant des éléments contraires aux lois, bonnes mœurs, ou règles de diffusion sera supprimée sans compensation.
                  </li>
                  <li>
                    L’utilisation de services de dépôt massif d’annonces est interdite. Ces pratiques sont passibles de poursuites pénales selon la législation marocaine.
                  </li>
                  <li>
                    Mounassabat.ma n’est pas responsable des contenus dupliqués, des insultes, ou des propos diffamatoires publiés sur son site.
                  </li>
                  <li>
                    L'accès continu au site n'est pas garanti en cas de problèmes techniques ou de maintenance.
                  </li>
                  <li>
                    Toute atteinte à la vie privée ou intrusion non autorisée sera poursuivie pénalement.
                  </li>
                </ul>
              </section>

              {/* Section: Contenus Non Autorisés */}
              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  Contenus Non Autorisés
                </h2>
                <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
                  <li>Rédaction en langues autres que le français ou l’arabe.</li>
                  <li>Descriptions sans rapport avec le contenu proposé.</li>
                  <li>Utilisation abusive de mots-clés.</li>
                  <li>Contenus à caractère politique, discriminatoire, ou sexiste.</li>
                  <li>Proposition d’articles interdits par la législation marocaine.</li>
                  <li>Offres non réalistes ou contraires aux règles de Mounassabat.ma.</li>
                  <li>
                    Contenus personnels ou portant atteinte à l’image, contenus pornographiques, ou contraires aux lois.
                  </li>
                </ul>
              </section>

              {/* Section: Produits et Services Non Autorisés */}
              <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: "#e6cf8c" }}>
                  Produits et Services Non Autorisés
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Assurez-vous que les services proposés sont légaux et conformes aux règles de Mounassabat.ma. Les produits interdits incluent, sans s’y limiter :
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700 leading-relaxed">
                  <li>Tabac, drogues, et substances dangereuses.</li>
                  <li>Armes blanches, armes à feu, explosifs.</li>
                  <li>Produits contrefaits ou portant atteinte aux droits de propriété intellectuelle.</li>
                  <li>Services ou emplois illégaux.</li>
                  <li>Objets dérivés d’espèces protégées, comme l’ivoire.</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  <strong>Exceptions:</strong> Sont autorisées toutes les prestations liées à l’activité événementielle, telles que :
                </p>
                <ul className="list-disc pl-6 mt-2 text-gray-700 leading-relaxed">
                  <li>Planification et organisation d'événements (mariages, séminaires, conférences).</li>
                  <li>Location de matériel événementiel (tentes, systèmes de sonorisation).</li>
                  <li>Services de restauration et traiteur.</li>
                  <li>Animation et divertissement (DJ, artistes, photographes).</li>
                  <li>Décoration pour événements.</li>
                  <li>Services de sécurité et gestion des invités.</li>
                  <li>Transport et location de véhicules pour événements.</li>
                  <li>Publicité et communication événementielle.</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  Mounassabat.ma offre une gestion efficace des réservations et des communications entre prestataires et organisateurs d'événements, garantissant une expérience optimale pour ses utilisateurs.
                </p>
              </section>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Index;
