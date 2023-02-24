
/**
 * Extract a message from a GPG/PGP signed message
 * @param {string} signed
 * @returns string 
 */
function extract(signed) {
    let extract = signed;
    extract = extract.replace(/(?<=-----BEGIN PGP SIGNED MESSAGE-----)\r{0,1}\n(.*: .*)(\r{0,1}\n){2}/gm, '');
    extract = extract.replace(/-----BEGIN PGP SIGNATURE-----(.|\r{0,1}\n)*-----END PGP SIGNATURE-----/gm, '');
    extract = extract.replace('-----BEGIN PGP SIGNED MESSAGE-----', '');
    extract = extract.replace(/(\n\n)$/gm, '');
    return extract;
}

module.exports = { extract };